import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// Define el tipo de servidor y episodio
type Server = {
  name: string;
  url: string;
};

type Episode = {
  number: number;
  title: string;
  duration: string;
  servers: Server[];
};

export async function POST(req: Request) {
  const { series } = await req.json();

  if (!series || !Array.isArray(series) || series.length === 0) {
    return new NextResponse("No hay series", { status: 400 });
  }

  try {
    const createdSeries = await Promise.all(
      series.map(async (serie: Prisma.SerieCreateInput) => {
        const {
          title,
          thumbnailUrl,
          genre,
          age,
          duration,
          trailerVideo,
          description,
          type,
          seasons,
        } = serie;

        const validatedSeasons = Array.isArray(seasons)
          ? seasons.map((season) => {
              const validatedEpisodes = season.episodes.map((ep: Episode) => ({
                number: ep.number,
                title: ep.title,
                duration: ep.duration,
                servers: ep.servers,
              }));

              return {
                number: season.number,
                episodes: {
                  create: validatedEpisodes,
                },
              };
            })
          : [];

        return db.serie.create({
          data: {
            title,
            thumbnailUrl,
            genre,
            age,
            duration,
            trailerVideo,
            description,
            type,
            seasons: {
              create: validatedSeasons,
            },
          },
        });
      })
    );

    return NextResponse.json(createdSeries, { status: 201 });
  } catch (error) {
    console.error("Error al crear series:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
