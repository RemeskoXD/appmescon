import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, first_name, last_name, phone, budget, services } = body;

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json({ error: "Chybějící povinná pole" }, { status: 400 });
    }

    // Check if user exists
    const [existing] = await pool.query<any[]>("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: "Uživatel s tímto e-mailem již existuje" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await pool.query<any>(
      "INSERT INTO users (first_name, last_name, email, password_hash, role_id, is_active) VALUES (?, ?, ?, ?, 2, 1)",
      [first_name, last_name, email, hashedPassword]
    );

    const userId = result.insertId;

    // Create a lead record for every registration
    await pool.query(
      "INSERT INTO leads (user_id, first_name, last_name, email, phone, source, status) VALUES (?, ?, ?, ?, ?, 'REGISTRATION', 'NEW')",
      [userId, first_name, last_name, email, phone || null]
    );

    // Optional: Create a customer record if budget/services provided
    // (We keep this for now, but the user wants to "pull them into contacts" from leads, 
    // so maybe we should stop auto-creating customers here? 
    // Actually, let's keep it as an "automatic" conversion if they provide details, 
    // but the lead will still exist for tracking.)
    if (budget || services) {
      await pool.query(
        "INSERT INTO customers (contact_name, email, phone, customer_status, owner_id) VALUES (?, ?, ?, 'NEW', ?)",
        [`${first_name} ${last_name}`, email, phone || null, userId]
      );
    }

    return NextResponse.json({ message: "Registrace úspěšná", userId }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Interní chyba serveru", details: error.message }, { status: 500 });
  }
}
