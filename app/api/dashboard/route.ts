import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [customerRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM customers");
    const [websiteRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM websites WHERE status = 'ACTIVE'");
    const [revenueRows] = await pool.query<any[]>("SELECT SUM(amount) as total FROM commissions WHERE status = 'PAID'");
    const [ticketRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM tickets WHERE status = 'OPEN'");
    const [leadRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM leads WHERE status = 'NEW'");
    
    const openTickets = ticketRows[0].count;
    const newLeads = leadRows[0].count;

    // Fetch recent activity
    const [recentActivity] = await pool.query<any[]>(
      `(SELECT 'CUSTOMER' as type, contact_name as title, created_at as date, 'Nový zákazník' as description FROM customers)
       UNION ALL
       (SELECT 'WEBSITE' as type, name as title, created_at as date, 'Nový projekt' as description FROM websites)
       UNION ALL
       (SELECT 'TICKET' as type, title as title, created_at as date, 'Nový ticket' as description FROM tickets)
       UNION ALL
       (SELECT 'LEAD' as type, CONCAT(first_name, ' ', last_name) as title, created_at as date, 'Nový lead' as description FROM leads)
       ORDER BY date DESC
       LIMIT 5`
    );

    // Fetch revenue chart data (last 6 months)
    const [revenueChartData] = await pool.query<any[]>(
      `SELECT 
         DATE_FORMAT(created_at, '%Y-%m') as month,
         SUM(amount) as revenue
       FROM commissions
       WHERE status = 'PAID'
       AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY month
       ORDER BY month ASC`
    );

    return NextResponse.json({
      totalCustomers: customerRows[0].count,
      activeWebsites: websiteRows[0].count,
      monthlyRevenue: revenueRows[0].total || 0,
      openTickets,
      newLeads,
      recentActivity,
      revenueChartData
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
