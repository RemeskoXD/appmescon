import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allowedRoles = ["ADMIN", "MODERATOR", "SUPPORT", "SALES_OP", "SALES_JUNIOR", "DEVELOPER_OP", "DESIGNER", "PECE"];
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id: customerId } = await params;

  try {
    // 1. Fetch Customer Profile
    const [customerRows] = await pool.query<any[]>(
      `SELECT c.*, 
              CONCAT(u.first_name, ' ', u.last_name) as owner_name
       FROM customers c
       LEFT JOIN users u ON c.owner_id = u.id
       WHERE c.id = ?`,
      [customerId]
    );

    if (customerRows.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const customer = customerRows[0];

    // 2. Fetch Customer Websites
    const [websites] = await pool.query(
      "SELECT * FROM websites WHERE customer_id = ?",
      [customerId]
    );

    // 3. Fetch Customer Invoices
    const [invoices] = await pool.query(
      "SELECT * FROM invoices WHERE customer_id = ? ORDER BY created_at DESC",
      [customerId]
    );

    // 4. Fetch Customer Tickets
    const [tickets] = await pool.query(
      "SELECT * FROM tickets WHERE customer_id = ? ORDER BY created_at DESC",
      [customerId]
    );

    return NextResponse.json({
      customer,
      websites,
      invoices,
      tickets
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
