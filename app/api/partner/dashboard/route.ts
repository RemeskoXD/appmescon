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

    // Total commissions
    const [commissionRows] = await pool.query<any[]>(
      "SELECT SUM(amount) as total FROM commissions WHERE user_id = ?",
      [userId]
    );

    // Referred customers
    const [customerRows] = await pool.query<any[]>(
      "SELECT COUNT(*) as count FROM customers WHERE owner_id = ?",
      [userId]
    );

    // Pending payout
    const [pendingRows] = await pool.query<any[]>(
      "SELECT SUM(amount) as total FROM commissions WHERE user_id = ? AND status = 'PENDING'",
      [userId]
    );

    // Recent activity (commissions and customers)
    const [recentCommissions] = await pool.query<any[]>(
      `SELECT 'commission' as type, CONCAT('Provize - ', c.contact_name) as title, 
              com.amount, com.status, com.created_at as date
       FROM commissions com
       JOIN customers c ON com.customer_id = c.id
       WHERE com.user_id = ?
       ORDER BY com.created_at DESC
       LIMIT 5`,
      [userId]
    );

    return NextResponse.json({
      totalCommissions: commissionRows[0].total || 0,
      referredCustomers: customerRows[0].count,
      pendingPayout: pendingRows[0].total || 0,
      conversionRate: 0, // Mock for now
      recentActivity: recentCommissions
    });
  } catch (error) {
    console.error("Partner dashboard error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
