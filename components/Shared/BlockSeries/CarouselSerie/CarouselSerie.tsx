"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ActionsButtons } from "@/components/Shared/ActionButtons";
import { ChaptersInfo } from "@/components/Shared/ChaptersInfo";
import { FilmGenres } from "@/components/Shared/FilmGenres";

interface Serie {
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
  series: Serie[];
}

export function CarouselSerie({ series }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <Carousel>
        <CarouselContent className="flex gap-3 px-2 pr-4 touch-pan-x overflow-x-auto overflow-y-hidden scrollbar-hide">
          {series.map((serie) => (
            <CarouselItem
              key={serie.isMoreCard ? "ver-mas" : serie.id}
              className="w-[80%] sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[16.6%] flex-none group relative transition"
            >
              <div className="relative aspect-[2/3] bg-zinc-900 rounded-md overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300">
                {serie.isMoreCard ? (
                  <Link href="/series">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-center text-lg bg-gradient-to-br from-slate-800 to-slate-900">
                      Ver más
                    </div>
                  </Link>
                ) : (
                  <>
                    <Image
                      src={serie.thumbnailUrl}
                      alt={serie.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 z-10">
                      <h4 className="text-white font-semibold text-sm truncate mb-1">
                        {serie.title}
                      </h4>
                      {serie.description && (
                        <p className="text-gray-300 text-xs mb-2 line-clamp-3">
                          {serie.description}
                        </p>
                      )}
                      <ActionsButtons
                        filmId={serie.id}
                        title={serie.title}
                        type="serie"
                        isMyList={false}
                      />
                      <ChaptersInfo
                        title={serie.title}
                        age={serie.age}
                        duration={serie.duration}
                      />
                      <FilmGenres genres={serie.genre} />
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
