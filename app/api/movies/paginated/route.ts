// app/api/movies/paginated/route.ts

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const take = 20;
  const skip = take * (page - 1);

  const movies = await db.movie.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(movies);
}
