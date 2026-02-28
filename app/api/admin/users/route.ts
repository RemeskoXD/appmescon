import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(_req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [users] = await pool.query(`
      SELECT u.id, u.first_name, u.last_name, u.email, r.name as role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.is_active = 1
      ORDER BY u.first_name ASC
    `);
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
