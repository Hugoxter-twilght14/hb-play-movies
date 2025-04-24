"use client";

import Link from "next/link";
import { useState } from "react";
import { ActionsButtonsFilm } from "@/components/Shared/ActionsButtonsFilm";
import { ChaptersInfo } from "./ChaptersInfo";
import { FilmGenres } from "./FilmGenres";
import { CarouselMovieProps } from "./CarouselMovie.types";

export function CarouselMovie({ movies }: CarouselMovieProps) {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-auto max-w-full">
      <div className="flex gap-4 px-4 py-6 overflow-x-auto scroll-smooth snap-x scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.isMoreCard ? "ver-mas" : movie.id}
            className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[16%] bg-zinc-800 text-white rounded-2xl overflow-hidden border border-zinc-700 shadow-md transition-transform duration-300"
          >
            {movie.isMoreCard ? (
              <Link href="/peliculas">
                <div className="w-full h-full min-h-[250px] flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl">
                  Ver más
                </div>
              </Link>
            ) : (
              <div
                className="relative w-full aspect-[2/3] overflow-hidden cursor-pointer"
                onClick={() =>
                  setActiveIndex(activeIndex === movie.id ? null : movie.id)
                }
              >
                <img
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Contenido desplegable */}
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-zinc-900/95 p-4 flex flex-col gap-2 z-10 transition-all duration-300 ${
                    activeIndex === movie.id ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <h4 className="text-base font-semibold truncate">
                    {movie.title}
                  </h4>

                  <p className="text-gray-300 text-sm line-clamp-2">
                    {movie.descriptionPelicula}
                  </p>

                  <ActionsButtonsFilm title={movie.title} idFilm={movie.id} />

                  <ChaptersInfo
                    title={movie.title}
                    age={movie.age}
                    duration={movie.duration}
                  />

                  <FilmGenres genres={movie.genre} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
