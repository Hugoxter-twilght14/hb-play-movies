import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const take = 18;
  const skip = take * (page - 1);

  const animes = await db.anime.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { seasons: true },
  });

  return NextResponse.json(animes);
}
