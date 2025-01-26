import Link from "next/link";
import { BlockPeliculasProps } from "./BlockPeliculas.types";

export function BlockPeliculas({ movies }: BlockPeliculasProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <img
            src={movie.thumbnailUrl}
            alt={movie.title}
            className="rounded-md cursor-pointer transition-transform transform hover:scale-105 w-full h-auto"
          />
        </Link>
      ))}
    </div>
  );
}

