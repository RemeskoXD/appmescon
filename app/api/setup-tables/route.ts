import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const queries = [
      `CREATE TABLE IF NOT EXISTS \`tickets\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`description\` TEXT,
        \`status\` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') DEFAULT 'OPEN',
        \`priority\` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
        \`customer_id\` INT DEFAULT NULL,
        \`assigned_to\` INT DEFAULT NULL,
        \`created_by\` INT NOT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE SET NULL,
        FOREIGN KEY (\`assigned_to\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL,
        FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

      `CREATE TABLE IF NOT EXISTS \`invoices\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`invoice_number\` VARCHAR(50) NOT NULL UNIQUE,
        \`customer_id\` INT NOT NULL,
        \`website_id\` INT DEFAULT NULL,
        \`amount\` DECIMAL(15, 2) NOT NULL,
        \`status\` ENUM('UNPAID', 'PAID', 'OVERDUE') DEFAULT 'UNPAID',
        \`due_date\` DATE NOT NULL,
        \`paid_at\` TIMESTAMP NULL DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`website_id\`) REFERENCES \`websites\`(\`id\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

      `CREATE TABLE IF NOT EXISTS \`commissions\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`user_id\` INT NOT NULL,
        \`website_id\` INT DEFAULT NULL,
        \`amount\` DECIMAL(15, 2) NOT NULL,
        \`status\` ENUM('PENDING', 'APPROVED', 'PAID') DEFAULT 'PENDING',
        \`description\` VARCHAR(255) DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`website_id\`) REFERENCES \`websites\`(\`id\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
    ];

    for (const q of queries) {
      await pool.query(q);
    }

    return NextResponse.json({ success: true, message: "Tables created" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
