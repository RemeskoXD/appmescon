import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });
    }

    await pool.query(
      "UPDATE leads SET status = ?, notes = ? WHERE id = ?",
      [status, notes, id]
    );

    return NextResponse.json({ message: "Lead updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Convert lead to customer
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });
    }

    // Get lead data
    const [leads] = await pool.query<any[]>("SELECT * FROM leads WHERE id = ?", [leadId]);
    if (leads.length === 0) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const lead = leads[0];

    // Check if already converted
    if (lead.status === 'CONVERTED') {
      return NextResponse.json({ error: "Lead already converted" }, { status: 400 });
    }

    // Insert into customers
    await pool.query(
      "INSERT INTO customers (user_id, contact_name, email, phone, customer_status) VALUES (?, ?, ?, ?, 'NEW')",
      [lead.user_id, `${lead.first_name} ${lead.last_name}`, lead.email, lead.phone]
    );

    // Update lead status
    await pool.query(
      "UPDATE leads SET status = 'CONVERTED' WHERE id = ?",
      [leadId]
    );

    return NextResponse.json({ message: "Lead converted to customer successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
