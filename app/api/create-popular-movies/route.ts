import { db } from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {movies} = await req.json();

    if (!movies || !Array.isArray(movies) || movies.length === 0) {
        return new NextResponse("No hay peliculas", {status: 400});
    }
    try {
        const createdMovies = await Promise.all(movies.map(async (movie) => {
            const {title, ranking, movieVideo, trailerVideo, thumbnailUrl, genre, duration, age, descriptionPelicula, typePelicula} = movie;

            if ( !title || !ranking || !movieVideo || !trailerVideo || !thumbnailUrl || !genre || !duration || !age || !descriptionPelicula || !typePelicula) {
                throw new Error('Faltan datos para poder subir la pelicula: ${title}');
            }

            return await db.popularMovie.create({
                data: {
                    title,
                    ranking,
                    thumbnailUrl,
                    genre,
                    age,
                    duration,
                    trailerVideo,
                    movieVidieo: movieVideo,
                    descriptionPelicula,
                    typePelicula
                }
            });

        })
    );
        return NextResponse.json(createdMovies, {status: 201});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", {status: 500});
    }
}