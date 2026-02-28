import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: websiteId } = await params;

  try {
    const [rows] = await pool.query<any[]>(
      `SELECT w.*, 
              c.company_name, c.contact_name, c.email as customer_email,
              u.first_name as dev_name, u.last_name as dev_surname,
              s.first_name as sales_name, s.last_name as sales_surname
       FROM websites w
       JOIN customers c ON w.customer_id = c.id
       LEFT JOIN users u ON w.developer_id = u.id
       LEFT JOIN users s ON w.sales_id = s.id
       WHERE w.id = ?`,
      [websiteId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: websiteId } = await params;

  try {
    const body = await req.json();
    const fields = Object.keys(body);
    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const values = [...Object.values(body), websiteId];

    await pool.query(
      `UPDATE websites SET ${setClause} WHERE id = ?`,
      values
    );

    return NextResponse.json({ message: "Website updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
