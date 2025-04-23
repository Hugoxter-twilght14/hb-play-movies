"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ActionsButtons } from "@/components/Shared/ActionButtons";
import { ChaptersInfo } from "@/components/Shared/ChaptersInfo";
import { FilmGenres } from "@/components/Shared/FilmGenres";

interface Anime {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  description?: string;
  isMoreCard?: boolean;
}

interface Props {
  animes: Anime[];
}

export function CarouselAnime({ animes }: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide px-2 touch-pan-x w-full">
        {animes.map((anime) => (
          <CarouselItem
            key={anime.isMoreCard ? "ver-mas" : anime.id}
            className="flex-none w-[45%] sm:w-[35%] md:w-[25%] lg:w-[20%] xl:w-[16.6%] group relative transition"
          >
            <div className="relative aspect-[2/3] bg-zinc-900 rounded-md overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300">
              {anime.isMoreCard ? (
                <Link href="/animes">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-center text-lg bg-gradient-to-br from-slate-800 to-slate-900">
                    Ver más
                  </div>
                </Link>
              ) : (
                <>
                  <Image
                    src={anime.thumbnailUrl}
                    alt={anime.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 z-10">
                    <h4 className="text-white font-semibold text-sm truncate mb-1">
                      {anime.title}
                    </h4>
                    {anime.description && (
                      <p className="text-gray-300 text-xs mb-2 line-clamp-3">
                        {anime.description}
                      </p>
                    )}
                    <ActionsButtons
                      filmId={anime.id}
                      title={anime.title}
                      type="anime"
                      isMyList={false}
                    />
                    <ChaptersInfo
                      title={anime.title}
                      age={anime.age}
                      duration={anime.duration}
                    />
                    <FilmGenres genres={anime.genre} />
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
