import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Tipos definidos
type Server = { name: string; url: string };
type Episode = { number: number; title: string; duration: string; servers: Server[] };
type Season = { number: number; episodes: Episode[] };
type Anime = {
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  trailerVideo: string;
  description: string;
  type: "anime";
  seasons: Season[];
};

export async function POST(req: NextRequest) {
  try {
    const { animes }: { animes: Anime[] } = await req.json();

    if (!Array.isArray(animes) || animes.length === 0) {
      return NextResponse.json({ message: "No se enviaron animes válidos" }, { status: 400 });
    }

    const createdAnimes = await Promise.all(
      animes.map(async (anime) => {
        return db.anime.create({
          data: {
            title: anime.title,
            thumbnailUrl: anime.thumbnailUrl,
            genre: anime.genre,
            age: anime.age,
            duration: anime.duration,
            trailerVideo: anime.trailerVideo,
            description: anime.description,
            type: anime.type,
            seasons: {
              create: anime.seasons.map((season) => ({
                number: season.number,
                episodes: {
                  create: season.episodes.map((ep) => ({
                    number: ep.number,
                    title: ep.title,
                    duration: ep.duration,
                    servers: ep.servers,
                  })),
                },
              })),
            },
          },
        });
      })
    );

    return NextResponse.json({ message: "Animes subidos correctamente", createdAnimes }, { status: 201 });
  } catch (error) {
    console.error("Error al subir los animes:", error);
    return NextResponse.json({ message: "Error interno", error }, { status: 500 });
  }
}
