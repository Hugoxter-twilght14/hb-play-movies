// pages/movie/[movieId].tsx

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavbarFilm } from "./components/NavbarFilm";
import { MovieDetail } from "./components/MovieDetail";

export default async function page({params}: {params: {movieId: string}}) {
    const movieFilm = await db.movie.findUnique({
        where: {
            id: params.movieId,
        },
    });

    const popularMovie = await db.popularMovie.findUnique({
        where: {
            id: params.movieId,
        },
    });

    if (!movieFilm && !popularMovie) {
        redirect("/"); // Redirige si no se encuentra la película
    }

    const currentMovie = movieFilm || popularMovie;

    return (
        <div className="h-screen w-full bg-black">
            <NavbarFilm title={currentMovie?.title || "Película"} />
            {/* Usamos el operador de afirmación non-null para indicar que currentMovie no es null */}
            <MovieDetail movie={currentMovie!} />
        </div>
    );
}

