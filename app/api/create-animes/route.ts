import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Definir tipos para los datos
type Episode = {
  number: number;
  title: string;
  duration: string;
  videoUrl: string;
};

type Season = {
  number: number;
  episodes: Episode[];
};

type Anime = {
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  trailerVideo: string;
  seasons: Season[];
};

// Manejar el método POST para crear animes
export async function POST(req: NextRequest) {
  try {
    const { animes }: { animes: Anime[] } = await req.json();

    if (!Array.isArray(animes) || animes.length === 0) {
      return NextResponse.json(
        { message: "No se enviaron animes válidos" },
        { status: 400 }
      );
    }

    // Crear los animes y sus relaciones usando Promise.all
    const createdAnimes = await Promise.all(
      animes.map(async (anime) => {
        // Validar datos esenciales
        if (
          !anime.title ||
          !anime.thumbnailUrl ||
          !anime.genre ||
          !anime.age ||
          !anime.duration ||
          !anime.trailerVideo
        ) {
          throw new Error(`Datos incompletos para el anime: ${anime.title}`);
        }

        return db.anime.create({
          data: {
            title: anime.title,
            thumbnailUrl: anime.thumbnailUrl,
            genre: anime.genre,
            age: anime.age,
            duration: anime.duration,
            trailerVideo: anime.trailerVideo,
            seasons: {
              create: anime.seasons.map((season) => ({
                number: season.number,
                episodes: {
                  create: season.episodes.map((episode) => ({
                    number: episode.number,
                    title: episode.title,
                    duration: episode.duration,
                    videoUrl: episode.videoUrl,
                  })),
                },
              })),
            },
          },
        });
      })
    );

    return NextResponse.json(
      { message: "Animes subidos correctamente", createdAnimes },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al subir los animes:", error);
    return NextResponse.json(
      { message: "Error al subir los animes", error: error },
      { status: 500 }
    );
  }
}
