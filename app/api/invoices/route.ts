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
    SELECT i.*, 
           c.company_name, c.contact_name,
           w.name as website_name
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    LEFT JOIN websites w ON i.website_id = w.id
    WHERE 1=1
  `;
  
  const params: any[] = [];

  if (status && status !== "ALL") {
    query += ` AND i.status = ?`;
    params.push(status);
  }

  if (search) {
    query += ` AND (i.invoice_number LIKE ? OR c.company_name LIKE ?)`;
    const searchLike = `%${search}%`;
    params.push(searchLike, searchLike);
  }

  query += ` ORDER BY i.created_at DESC`;

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
    const { invoice_number, customer_id, website_id, amount, due_date } = body;

    const [result] = await pool.query<any>(
      `INSERT INTO invoices (invoice_number, customer_id, website_id, amount, due_date) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        invoice_number, 
        customer_id, 
        website_id || null, 
        amount, 
        due_date
      ]
    );

    return NextResponse.json({ id: result.insertId, message: "Invoice created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
