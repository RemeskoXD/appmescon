import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await pool.query("UPDATE portfolio_items SET is_active = 0 WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, url, image_url, description } = body;

    let finalImageUrl = image_url;
    if (!finalImageUrl) {
      finalImageUrl = `https://image.thum.io/get/width/600/crop/800/${url}`;
    }

    await pool.query(
      "UPDATE portfolio_items SET title = ?, url = ?, image_url = ?, description = ? WHERE id = ?",
      [title, url, finalImageUrl, description, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
