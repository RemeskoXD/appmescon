import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [rows] = await pool.query<any[]>(
      `SELECT id, company_name, contact_name, customer_status as status, created_at as date 
       FROM customers 
       WHERE owner_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Partner referrals error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { company_name, contact_name, email, phone, note } = body;

    if (!contact_name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert as a new customer with status 'NEW' or 'POTENTIAL'
    const [result] = await pool.query<any>(
      `INSERT INTO customers (company_name, contact_name, email, phone, owner_id, customer_status) 
       VALUES (?, ?, ?, ?, ?, 'NEW')`,
      [company_name, contact_name, email, phone, session.user.id]
    );

    // Optionally add a ticket or activity log here if needed
    if (note) {
      await pool.query(
        `INSERT INTO tickets (title, description, customer_id, created_by, status, priority) 
         VALUES (?, ?, ?, ?, 'OPEN', 'MEDIUM')`,
        [`Nové doporučení: ${company_name || contact_name}`, note, result.insertId, session.user.id]
      );
    }

    return NextResponse.json({ id: result.insertId, message: "Referral created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Partner referral creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
