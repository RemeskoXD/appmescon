import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if user has approved commissions
    const [approvedCommissions] = await pool.query<any[]>(
      "SELECT SUM(amount) as total FROM commissions WHERE user_id = ? AND status = 'APPROVED'",
      [userId]
    );

    const totalApproved = approvedCommissions[0].total || 0;

    if (totalApproved < 1000) {
      return NextResponse.json({ error: "Minimální částka pro výplatu je 1 000 Kč." }, { status: 400 });
    }

    // Create a payout request (we might need a payouts table, but for now we can update commissions status to a new state or just log it)
    // Let's assume we update APPROVED to PENDING_PAYOUT if we had such state, 
    // but for now let's just create a ticket for admin to process.
    
    await pool.query(
      `INSERT INTO tickets (title, description, created_by, status, priority) 
       VALUES (?, ?, ?, 'OPEN', 'HIGH')`,
      [
        `Žádost o výplatu: ${session.user.name}`, 
        `Partner ${session.user.name} (${session.user.email}) žádá o výplatu provizí v celkové výši ${totalApproved} Kč.`,
        userId
      ]
    );

    return NextResponse.json({ message: "Žádost o výplatu byla odeslána." });
  } catch (error) {
    console.error("Payout request error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
