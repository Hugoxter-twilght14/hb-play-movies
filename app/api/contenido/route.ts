// app/api/contenido/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const peliculas = await db.movie.findMany({
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        genre: true,
      },
    });

    const series = await db.serie.findMany({
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        genre: true,
      },
    });

    const animes = await db.anime.findMany({
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        genre: true,
      },
    });

    const data = [
      ...peliculas.map((p) => ({ ...p, type: "pelicula" })),
      ...series.map((s) => ({ ...s, type: "serie" })),
      ...animes.map((a) => ({ ...a, type: "anime" })),
    ];

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al obtener contenido:", error);
    return NextResponse.json({ error: "Error al obtener contenido" }, { status: 500 });
  }
}
