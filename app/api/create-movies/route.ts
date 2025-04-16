import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { movies } = await req.json();

    if (!movies || !Array.isArray(movies) || movies.length === 0) {
      return new NextResponse("No hay películas para subir", { status: 400 });
    }

    const createdMovies = await Promise.all(
      movies.map(async (movie) => {
        const {
          title,
          trailerVideo,
          thumbnailUrl,
          genre,
          duration,
          age,
          typePelicula,
          descriptionPelicula,
          servers,
        } = movie;

        return db.movie.create({
          data: {
            title,
            thumbnailUrl,
            genre,
            age,
            duration,
            trailerVideo,
            typePelicula,
            descriptionPelicula,
            servers,
            createdAt: new Date(),
          },
        });
      })
    );

    return NextResponse.json(createdMovies, { status: 201 });
  } catch (error) {
    console.error("Error al subir películas:", error);
    return NextResponse.json({ error: "Error interno", details: error }, { status: 500 });
  }
}
