// components/Shared/BlockPeliculas.tsx

"use client";

import Link from "next/link";
import { BlockPeliculasProps } from "./BlockPeliculas.types";
import Image from "next/image";

export function BlockPeliculas({ movies }: BlockPeliculasProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="relative flex flex-col rounded-2xl border border-white/10 overflow-hidden">
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="px-2 py-2 bg-black/60 rounded-b-2xl">
                <p className="text-white font-semibold text-sm truncate">{movie.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{movie.typePelicula}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
