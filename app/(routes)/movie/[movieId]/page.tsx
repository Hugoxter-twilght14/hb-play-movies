import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavbarFilm } from "./components/NavbarFilm";
import { MovieDetail } from "./components/MovieDetail";
import { Server } from "./components/MovieVideo/MovieVideo.types";

export default async function Page({ params }: { params: { movieId?: string } }) {
  if (!params?.movieId || typeof params.movieId !== "string" || params.movieId.trim() === "") {
    redirect("/");
  }

  let movieFilm = null;
  let popularMovie = null;

  try {
    movieFilm = await db.movie.findUnique({
      where: { id: params.movieId },
    });

    popularMovie = await db.popularMovie.findUnique({
      where: { id: params.movieId },
    });
  } catch (error) {
    console.error("❌ Error al cargar la película:", error);
    redirect("/peliculas");
  }

  if (!movieFilm && !popularMovie) {
    redirect("/");
  }

  const currentMovie = movieFilm || popularMovie;

  const movieWithParsedServers = {
    ...currentMovie!,
    servers: (currentMovie!.servers ?? []) as unknown as Server[],
  };

  return (
    <div className="h-screen w-full bg-black">
      <NavbarFilm title={movieWithParsedServers.title} />
      <MovieDetail movie={movieWithParsedServers} />
    </div>
  );
}
