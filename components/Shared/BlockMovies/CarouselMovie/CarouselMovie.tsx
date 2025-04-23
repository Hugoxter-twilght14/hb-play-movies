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
      <CarouselContent className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide px-1">
        {movies.map((movie) =>
          movie.isMoreCard ? (
            <CarouselItem
              key="ver-mas"
              className="basis-[45%] sm:basis-[35%] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 transition group relative"
            >
              <Link href="/peliculas">
                <div className="relative aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-md flex items-center justify-center text-white font-bold text-center text-lg hover:scale-105 transition-transform">
                  Ver más
                </div>
              </Link>
            </CarouselItem>
          ) : (
            <CarouselItem
              key={movie.id}
              className="basis-[45%] sm:basis-[35%] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 transition delay-300 group relative"
            >
              <div className="relative aspect-[2/3] bg-zinc-900 rounded-md overflow-hidden group cursor-pointer">
                <Image
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 z-10">
                  <h4 className="text-white font-semibold text-sm truncate mb-1">{movie.title}</h4>

                  <p className="text-slate-300 text-xs mb-2 line-clamp-2">
                    {movie.descriptionPelicula}
                  </p>

                  <ActionsButtonsFilm title={movie.title} idFilm={movie.id} />
                  <ChaptersInfo title={movie.title} age={movie.age} duration={movie.duration} />
                  <FilmGenres genres={movie.genre} />
                </div>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
}
