import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "ludvikremesekwork@gmail.com";
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const [users] = await pool.query<any[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      // Update existing user
      await pool.query(
        "UPDATE users SET password_hash = ? WHERE email = ?",
        [hashedPassword, email]
      );
      return NextResponse.json({
        success: true,
        message: "Admin password updated successfully.",
        credentials: { email, password }
      });
    } else {
      // Create new user
      const [roles] = await pool.query<any[]>(
        "SELECT id FROM roles WHERE name = 'ADMIN'"
      );

      if (roles.length === 0) {
        return NextResponse.json({
          success: false,
          error: "ADMIN role not found. Please import databaze.sql first."
        }, { status: 400 });
      }

      await pool.query(
        "INSERT INTO users (email, password_hash, first_name, last_name, role_id) VALUES (?, ?, ?, ?, ?)",
        [email, hashedPassword, "Ludvík", "Admin", roles[0].id]
      );

      return NextResponse.json({
        success: true,
        message: "Admin user created successfully.",
        credentials: { email, password }
      });
    }
  } catch (error) {
    console.error("Setup admin error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to setup admin user."
    }, { status: 500 });
  }
}
