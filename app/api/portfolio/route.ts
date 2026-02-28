import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const all = searchParams.get("all") === "true";

    let query = "SELECT * FROM portfolio_items WHERE is_active = 1 ORDER BY id DESC";
    let params: any[] = [];

    if (!all) {
      query += " LIMIT ? OFFSET ?";
      params = [limit, offset];
    }

    const [items] = await pool.query(query, params);
    
    // Get total count
    const [countResult]: any = await pool.query("SELECT COUNT(*) as total FROM portfolio_items WHERE is_active = 1");
    const total = countResult[0].total;

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, url, image_url, description } = body;

    if (!title || !url) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }

    let finalImageUrl = image_url;
    if (!finalImageUrl) {
      finalImageUrl = `https://image.thum.io/get/width/600/crop/800/${url}`;
    }

    const [result]: any = await pool.query(
      "INSERT INTO portfolio_items (title, url, image_url, description) VALUES (?, ?, ?, ?)",
      [title, url, finalImageUrl, description || ""]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
