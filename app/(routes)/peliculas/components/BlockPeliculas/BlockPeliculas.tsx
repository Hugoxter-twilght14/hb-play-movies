// components/Shared/BlockPeliculas.tsx

"use client";

import Link from "next/link";
import { BlockPeliculasProps } from "./BlockPeliculas.types";
import Image from "next/image";

export function BlockPeliculas({ movies }: BlockPeliculasProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <div className="w-full aspect-[2/3] relative rounded-md overflow-hidden group">
            <Image
              src={movie.thumbnailUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-semibold text-lg truncate">{movie.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
