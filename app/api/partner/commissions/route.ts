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
      `SELECT com.id, c.contact_name as client_name, com.amount, com.status, com.description, com.created_at as date 
       FROM commissions com
       JOIN customers c ON com.customer_id = c.id
       WHERE com.user_id = ?
       ORDER BY com.created_at DESC`,
      [userId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Partner commissions error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
