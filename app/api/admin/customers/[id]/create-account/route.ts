import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allowedRoles = ["ADMIN", "MODERATOR", "SALES_OP"];
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id: customerId } = await params;

  try {
    // 1. Get customer details
    const [customerRows] = await pool.query<any[]>(
      "SELECT * FROM customers WHERE id = ?",
      [customerId]
    );

    if (customerRows.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const customer = customerRows[0];

    if (customer.user_id) {
      return NextResponse.json({ error: "Customer already has an account" }, { status: 400 });
    }

    // 2. Check if user with this email already exists
    const [existingUserRows] = await pool.query<any[]>(
      "SELECT id FROM users WHERE email = ?",
      [customer.email]
    );

    let userId;

    if (existingUserRows.length > 0) {
      userId = existingUserRows[0].id;
    } else {
      // 3. Create new user
      const password = Math.random().toString(36).slice(-8); // Generate random password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Get role_id for CLIENT (assuming it's a role, if not we use USER or add it)
      // Let's find the role_id for 'USER' or 'CLIENT'
      const [roleRows] = await pool.query<any[]>(
        "SELECT id FROM roles WHERE name = 'USER' LIMIT 1"
      );
      
      const roleId = roleRows.length > 0 ? roleRows[0].id : 1;

      const [insertResult]: any = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role_id, phone, company_name) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          customer.email, 
          hashedPassword, 
          customer.contact_name.split(' ')[0] || 'Klient', 
          customer.contact_name.split(' ').slice(1).join(' ') || '', 
          roleId,
          customer.phone,
          customer.company_name
        ]
      );
      
      userId = insertResult.insertId;

      // TODO: Send email to customer with their new password
      console.log(`Created account for ${customer.email} with password: ${password}`);
    }

    // 4. Link user to customer
    await pool.query(
      "UPDATE customers SET user_id = ? WHERE id = ?",
      [userId, customerId]
    );

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error("Error creating client account:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
