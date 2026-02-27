import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic";

const ALLOWED_EXTENSIONS = new Set([".svg", ".png", ".webp"]);

export async function GET() {
  const partnersDir = path.join(process.cwd(), "public", "partners");

  try {
    const entries = await fs.readdir(partnersDir, { withFileTypes: true });
    const logos = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((file) => ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }));

    return NextResponse.json({ logos });
  } catch {
    return NextResponse.json({ logos: [] });
  }
}
