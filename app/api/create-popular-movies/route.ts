import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const { movies } = await req.json();

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return new NextResponse("No hay películas populares para subir", { status: 400 });
  }

  try {
    const createdMovies = await Promise.all(
      movies.map(async (movie) => {
        const {
          title,
          ranking,
          servers,
          trailerVideo,
          thumbnailUrl,
          genre,
          duration,
          age,
          descriptionPelicula,
          typePelicula,
        } = movie;

        if (
          !title || !ranking || !trailerVideo || !thumbnailUrl || !genre ||
          !duration || !age || !descriptionPelicula || !typePelicula
        ) {
          throw new Error(`Faltan datos para subir la película popular: ${title}`);
        }

        return db.popularMovie.create({
          data: {
            title,
            ranking,
            thumbnailUrl,
            genre,
            age,
            duration,
            trailerVideo,
            servers: servers ?? Prisma.JsonNull, // ✅ Aquí está la corrección segura
            descriptionPelicula,
            typePelicula,
          },
        });
      })
    );

    return NextResponse.json(createdMovies, { status: 201 });
  } catch (error) {
    console.error("Error al subir películas populares:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
