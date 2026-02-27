import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // Add missing columns to users table
    const columnsToAdd = [
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS ico VARCHAR(20) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS dic VARCHAR(20) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS street VARCHAR(255) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS city VARCHAR(100) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS zip VARCHAR(20) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS bank_account VARCHAR(100) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(50) DEFAULT NULL UNIQUE",
      `CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        source VARCHAR(50) DEFAULT 'REGISTRATION',
        status ENUM('NEW', 'CONTACTED', 'CONVERTED', 'REJECTED') DEFAULT 'NEW',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
    ];

    for (const sql of columnsToAdd) {
      try {
        await pool.query(sql);
      } catch (e) {
        console.error(`Error executing ${sql}:`, e);
      }
    }

    return NextResponse.json({ message: "Schema updated successfully" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
