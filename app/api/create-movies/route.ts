import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { movies } = await req.json();

        // Validar si `movies` es un array con datos
        if (!movies || !Array.isArray(movies) || movies.length === 0) {
            return new NextResponse("No hay películas para subir", { status: 400 });
        }

        const createdMovies = await Promise.all(
            movies.map(async (movie) => {
                const { title, movieVideo, trailerVideo, thumbnailUrl, genre, duration, age, typePelicula, descriptionPelicula } = movie;

                // Validación de campos obligatorios
                if (!title || !movieVideo || !trailerVideo || !thumbnailUrl || !genre || !duration || !age || !typePelicula || !descriptionPelicula) {
                    throw new Error(`Faltan datos para poder subir la película: ${title || "Desconocido"}`);
                }

                return await db.movie.create({
                    data: {
                        title,
                        thumbnailUrl,
                        genre,
                        age,
                        duration,
                        trailerVideo,
                        movieVidieo: movieVideo,
                        typePelicula,
                        descriptionPelicula,
                        createdAt: new Date(),
                    }
                });
            })
        );

        return NextResponse.json(createdMovies, { status: 201 });

    } catch (error) {
        console.error("Error al subir películas:", error);
        return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
    }
}
