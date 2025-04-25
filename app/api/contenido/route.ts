import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type Contenido = {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string[];
  anio: number | null;
  type: "pelicula" | "serie" | "anime";
};

// Función para normalizar texto (elimina tildes y pasa a minúsculas)
const normalize = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const tipo = searchParams.get("tipo");
  const generoRaw = searchParams.get("genero");
  const anio = searchParams.get("anio");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const take = 10;
  const skip = (page - 1) * take;

  const genero = generoRaw ? normalize(generoRaw) : null;

  // Filtros comunes
  const whereCommon = {
    title: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
    ...(anio ? { anio: Number(anio) } : {}),
  };

  const aplicarFiltroGenero = <T extends { genre: string[] }>(items: T[]): T[] =>
    genero
      ? items.filter((item) =>
          item.genre?.some((g: string) => normalize(g) === genero)
        )
      : items;

  try {
    let results: Contenido[] = [];

    const selectFields = {
      id: true,
      title: true,
      thumbnailUrl: true,
      genre: true,
      anio: true,
    };

    if (tipo === "pelicula") {
      const peliculas = await db.movie.findMany({
        where: whereCommon,
        select: selectFields,
        take,
        skip,
        orderBy: { createdAt: "desc" },
      });
      results = aplicarFiltroGenero(peliculas).map((p) => ({ ...p, type: "pelicula" as const }));
    } else if (tipo === "serie") {
      const series = await db.serie.findMany({
        where: whereCommon,
        select: selectFields,
        take,
        skip,
        orderBy: { createdAt: "desc" },
      });
      results = aplicarFiltroGenero(series).map((s) => ({ ...s, type: "serie" as const }));
    } else if (tipo === "anime") {
      const animes = await db.anime.findMany({
        where: whereCommon,
        select: selectFields,
        take,
        skip,
        orderBy: { createdAt: "desc" },
      });
      results = aplicarFiltroGenero(animes).map((a) => ({ ...a, type: "anime" as const }));
    } else {
      // Si no se especifica un tipo, buscar en todos
      const [peliculas, series, animes] = await Promise.all([
        db.movie.findMany({
          where: whereCommon,
          select: selectFields,
          take,
          skip,
          orderBy: { createdAt: "desc" },
        }),
        db.serie.findMany({
          where: whereCommon,
          select: selectFields,
          take,
          skip,
          orderBy: { createdAt: "desc" },
        }),
        db.anime.findMany({
          where: whereCommon,
          select: selectFields,
          take,
          skip,
          orderBy: { createdAt: "desc" },
        }),
      ]);

      results = [
        ...aplicarFiltroGenero(peliculas).map((p) => ({ ...p, type: "pelicula" as const })),
        ...aplicarFiltroGenero(series).map((s) => ({ ...s, type: "serie" as const })),
        ...aplicarFiltroGenero(animes).map((a) => ({ ...a, type: "anime" as const })),
      ];
      
      results.sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("❌ Error en API contenido:", error);
    return NextResponse.json(
      { error: "Error al obtener contenido" },
      { status: 500 }
    );
  }
}
