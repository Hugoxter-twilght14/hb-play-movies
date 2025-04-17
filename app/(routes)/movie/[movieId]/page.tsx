import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavbarFilm } from "./components/NavbarFilm";
import { MovieDetail } from "./components/MovieDetail";
import { Server } from "./components/MovieVideo/MovieVideo.types";

export default async function page({ params }: { params: { movieId: string } }) {
  const movieFilm = await db.movie.findUnique({
    where: { id: params.movieId },
  });

  const popularMovie = await db.popularMovie.findUnique({
    where: { id: params.movieId },
  });

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
