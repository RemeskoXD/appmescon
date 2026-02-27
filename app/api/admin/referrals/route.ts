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
    // Fetch customers owned by partners (EXTERNAL role)
    const [rows] = await pool.query<any[]>(
      `SELECT c.*, 
              CONCAT(u.first_name, ' ', u.last_name) as partner_name,
              u.email as partner_email
       FROM customers c
       JOIN users u ON c.owner_id = u.id
       JOIN roles r ON u.role_id = r.id
       WHERE r.name = 'EXTERNAL'
       ORDER BY c.created_at DESC`
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Admin referrals error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
