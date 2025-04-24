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
    <div className="w-full overflow-x-auto max-w-full">
      <Carousel>
        <CarouselContent className="flex gap-3 px-2 pr-4 overflow-x-auto overflow-y-hidden touch-pan-x snap-x scroll-smooth">
          {animes.map((anime) => (
            <CarouselItem
              key={anime.isMoreCard ? "ver-mas" : anime.id}
              className="snap-start flex-none w-[85%] sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[16.6%] group relative transition will-change-transform"
            >
              <div className="relative w-full h-[280px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[450px] bg-zinc-900 rounded-md overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300">
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
                      priority
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-cover"
                    />
                    {/* Solo se muestra el overlay en pantallas md+ */}
                    <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/90 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-3 z-10">
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
    </div>
  );
}
