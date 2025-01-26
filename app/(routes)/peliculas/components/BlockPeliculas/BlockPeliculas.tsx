"use client";
import { BlockPeliculasProps } from "./BlockPeliculas.types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function BlockPeliculas({ movies }: BlockPeliculasProps) {
  const router = useRouter();

  const handleMovieClick = (movieId: string) => {
    // Redirigir a la página de detalles de la película
    router.push(`/movie/${movieId}`);
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="-top-16 relative px-[4%] md:pt-20 md:pd-20 overflow-auto bg-[#171717]">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={movie.thumbnailUrl}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

