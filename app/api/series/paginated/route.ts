import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const take = 20;
  const skip = take * (page - 1);

  const series = await db.serie.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { seasons: true },
  });

  return NextResponse.json(series);
}
