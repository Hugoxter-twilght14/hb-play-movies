import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

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
          description, // Nuevo campo description
          type, // Nuevo campo type
          seasons,
        } = serie;

        // Verificar que los campos obligatorios estén presentes, incluyendo los nuevos campos
        if (
          !title ||
          !thumbnailUrl ||
          !genre ||
          !age ||
          !duration ||
          !trailerVideo ||
          !description || // Validación de description
          !type // Validación de type
        ) {
          throw new Error(`Faltan datos para crear la serie: ${title}`);
        }

        // Validación para seasons y episodes
        const validatedSeasons = Array.isArray(seasons)
          ? seasons.map((season) => {
              if (!season.number || !Array.isArray(season.episodes)) {
                throw new Error(`Datos incompletos para la temporada: ${season.number}`);
              }

              const validatedEpisodes = season.episodes.map((episode: Prisma.EpisodeCreateInput) => {
                if (!episode.number || !episode.title || !episode.duration || !episode.videoUrl) {
                  throw new Error(`Datos incompletos para el episodio: ${episode.title}`);
                }

                return {
                  number: episode.number,
                  title: episode.title,
                  duration: episode.duration,
                  videoUrl: episode.videoUrl,
                };
              });

              return {
                number: season.number,
                episodes: {
                  create: validatedEpisodes,
                },
              };
            })
          : [];

        // Crear la serie con temporadas y episodios, incluyendo los nuevos campos
        return await db.serie.create({
          data: {
            title,
            thumbnailUrl,
            genre,
            age,
            duration,
            trailerVideo,
            description, // Guardar description
            type, // Guardar type
            seasons: {
              create: validatedSeasons,
            },
          },
        });
      })
    );

    // Responder con las series creadas
    return NextResponse.json(createdSeries, { status: 201 });
  } catch (error) {
    console.error("Error al crear las series:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
