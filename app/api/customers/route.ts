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
           CONCAT(u.first_name, ' ', u.last_name) as owner_name
    FROM customers c
    LEFT JOIN users u ON c.owner_id = u.id
    WHERE 1=1
  `;
  
  const params: any[] = [];

  if (status && status !== "ALL") {
    query += ` AND c.customer_status = ?`;
    params.push(status);
  }

  if (search) {
    query += ` AND (c.company_name LIKE ? OR c.contact_name LIKE ? OR c.email LIKE ?)`;
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
    const { 
      company_name, 
      contact_name, 
      email, 
      phone, 
      customer_status, 
      owner_id 
    } = body;

    // Validation
    if (!contact_name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO customers (company_name, contact_name, email, phone, customer_status, owner_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [company_name, contact_name, email, phone, customer_status || 'NEW', owner_id || null]
    );

    return NextResponse.json({ id: (result as any).insertId, message: "Customer created" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
