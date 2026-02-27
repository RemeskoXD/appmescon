import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  
  let query = `
    SELECT t.*, 
           c.company_name,
           CONCAT(u1.first_name, ' ', u1.last_name) as assigned_name,
           CONCAT(u2.first_name, ' ', u2.last_name) as creator_name
    FROM tickets t
    LEFT JOIN customers c ON t.customer_id = c.id
    LEFT JOIN users u1 ON t.assigned_to = u1.id
    LEFT JOIN users u2 ON t.created_by = u2.id
    WHERE 1=1
  `;
  
  const params: any[] = [];

  if (status && status !== "ALL") {
    query += ` AND t.status = ?`;
    params.push(status);
  }

  if (search) {
    query += ` AND (t.title LIKE ? OR t.description LIKE ? OR c.company_name LIKE ?)`;
    const searchLike = `%${search}%`;
    params.push(searchLike, searchLike, searchLike);
  }

  query += ` ORDER BY t.created_at DESC`;

  try {
    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, priority, customer_id, assigned_to } = body;

    const [result] = await pool.query<any>(
      `INSERT INTO tickets (title, description, priority, customer_id, assigned_to, created_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title, 
        description || null, 
        priority || 'MEDIUM', 
        customer_id || null, 
        assigned_to || null, 
        session.user.id
      ]
    );

    return NextResponse.json({ id: result.insertId, message: "Ticket created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
