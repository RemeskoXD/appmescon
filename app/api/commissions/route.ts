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
    SELECT c.*, 
           CONCAT(u.first_name, ' ', u.last_name) as user_name,
           w.name as website_name
    FROM commissions c
    JOIN users u ON c.user_id = u.id
    LEFT JOIN websites w ON c.website_id = w.id
    WHERE 1=1
  `;
  
  const params: any[] = [];

  if (status && status !== "ALL") {
    query += ` AND c.status = ?`;
    params.push(status);
  }

  if (search) {
    query += ` AND (u.first_name LIKE ? OR u.last_name LIKE ? OR w.name LIKE ?)`;
    const searchLike = `%${search}%`;
    params.push(searchLike, searchLike, searchLike);
  }

  query += ` ORDER BY c.created_at DESC`;

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
    const { user_id, website_id, amount, description } = body;

    const [result] = await pool.query<any>(
      `INSERT INTO commissions (user_id, website_id, amount, description) 
       VALUES (?, ?, ?, ?)`,
      [
        user_id, 
        website_id || null, 
        amount, 
        description || null
      ]
    );

    return NextResponse.json({ id: result.insertId, message: "Commission created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
