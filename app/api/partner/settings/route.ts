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

    const [rows] = await pool.query<any[]>(
      "SELECT id, first_name, last_name, email, phone, company_name, ico, dic, street, city, zip, bank_account, referral_code FROM users WHERE id = ?",
      [session.user.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Settings GET error:", error);
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
    const { 
      first_name, last_name, phone, 
      company_name, ico, dic, 
      street, city, zip, 
      bank_account,
      referral_code
    } = body;

    await pool.query(
      `UPDATE users SET 
        first_name = ?, last_name = ?, phone = ?, 
        company_name = ?, ico = ?, dic = ?, 
        street = ?, city = ?, zip = ?, 
        bank_account = ?,
        referral_code = ?
       WHERE id = ?`,
      [
        first_name, last_name, phone, 
        company_name, ico, dic, 
        street, city, zip, 
        bank_account,
        referral_code,
        session.user.id
      ]
    );

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
