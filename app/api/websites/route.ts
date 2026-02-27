import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const expiring = searchParams.get("expiring"); // "true" to filter expiring soon
  
  let query = `
    SELECT w.*, 
           c.company_name, c.contact_name,
           u.first_name as dev_name, u.last_name as dev_surname
    FROM websites w
    JOIN customers c ON w.customer_id = c.id
    LEFT JOIN users u ON w.developer_id = u.id
    WHERE 1=1
  `;
  
  const params: any[] = [];

  if (status && status !== "ALL") {
    query += ` AND w.status = ?`;
    params.push(status);
  }

  if (search) {
    query += ` AND (w.name LIKE ? OR w.url LIKE ? OR c.company_name LIKE ?)`;
    const searchLike = `%${search}%`;
    params.push(searchLike, searchLike, searchLike);
  }

  if (expiring === "true") {
    // Check for expiration within 30 days for domain, hosting, or maintenance
    query += ` AND (
      (w.domain_expires_at IS NOT NULL AND w.domain_expires_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY)) OR
      (w.hosting_paid_until IS NOT NULL AND w.hosting_paid_until BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY)) OR
      (w.maintenance_paid_until IS NOT NULL AND w.maintenance_paid_until BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY))
    )`;
  }

  query += ` ORDER BY w.created_at DESC`;

  try {
    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { 
      customer_id, name, url, status, tech_stack,
      price_sold, monthly_hosting_fee, monthly_maintenance_fee, domain_price,
      domain_expires_at, hosting_paid_until, maintenance_paid_until,
      developer_id, sales_id
    } = body;

    if (!customer_id || !name || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO websites (
        customer_id, name, url, status, tech_stack,
        price_sold, monthly_hosting_fee, monthly_maintenance_fee, domain_price,
        domain_expires_at, hosting_paid_until, maintenance_paid_until,
        developer_id, sales_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_id, name, url, status || 'NEW', tech_stack,
        price_sold || 0, monthly_hosting_fee || 0, monthly_maintenance_fee || 0, domain_price || 0,
        domain_expires_at || null, hosting_paid_until || null, maintenance_paid_until || null,
        developer_id || null, sales_id || null
      ]
    );

    return NextResponse.json({ id: (result as any).insertId, message: "Website created" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
