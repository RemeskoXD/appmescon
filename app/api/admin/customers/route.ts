import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowedRoles = ["ADMIN", "MODERATOR", "SUPPORT", "SALES_OP", "SALES_JUNIOR", "DEVELOPER_OP", "DESIGNER", "PECE"];
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = `
      SELECT c.*, 
             u.first_name as owner_first_name, u.last_name as owner_last_name,
             (SELECT COUNT(*) FROM websites w WHERE w.customer_id = c.id) as websites_count
      FROM customers c
      LEFT JOIN users u ON c.owner_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== "ALL") {
      query += " AND c.customer_status = ?";
      params.push(status);
    }

    if (search) {
      query += " AND (c.company_name LIKE ? OR c.contact_name LIKE ? OR c.email LIKE ?)";
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    query += " ORDER BY c.created_at DESC";

    const [customers] = await pool.query(query, params);
    return NextResponse.json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowedRoles = ["ADMIN", "MODERATOR", "SALES_OP"];
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { company_name, contact_name, email, phone, customer_status, owner_id } = body;

    if (!contact_name || !email) {
      return NextResponse.json({ error: "Contact name and email are required" }, { status: 400 });
    }

    const [result]: any = await pool.query(
      `INSERT INTO customers (company_name, contact_name, email, phone, customer_status, owner_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [company_name || null, contact_name, email, phone || null, customer_status || 'NEW', owner_id || null]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
