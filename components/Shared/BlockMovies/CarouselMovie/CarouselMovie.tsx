"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ActionsButtonsFilm } from "@/components/Shared/ActionsButtonsFilm";
import { ChaptersInfo } from "./ChaptersInfo";
import { FilmGenres } from "./FilmGenres";
import { CarouselMovieProps } from "./CarouselMovie.types";

export function CarouselMovie({ movies }: CarouselMovieProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide px-2 touch-pan-x">
        {movies.map((movie) => (
          <CarouselItem
            key={movie.isMoreCard ? "ver-mas" : movie.id}
            className="flex-none w-[45%] sm:w-[35%] md:w-[25%] lg:w-[20%] xl:w-[16.6%] group relative transition"
          >
            <div className="relative aspect-[2/3] bg-zinc-900 rounded-md overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300">
              {movie.isMoreCard ? (
                <Link href="/peliculas">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-center text-lg bg-gradient-to-br from-slate-800 to-slate-900">
                    Ver más
                  </div>
                </Link>
              ) : (
                <>
                  <Image
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 z-10">
                    <h4 className="text-white font-semibold text-sm truncate mb-1">
                      {movie.title}
                    </h4>
                    <p className="text-slate-300 text-xs mb-2 line-clamp-2">
                      {movie.descriptionPelicula}
                    </p>
                    <ActionsButtonsFilm title={movie.title} idFilm={movie.id} />
                    <ChaptersInfo title={movie.title} age={movie.age} duration={movie.duration} />
                    <FilmGenres genres={movie.genre} />
                  </div>
                </>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
