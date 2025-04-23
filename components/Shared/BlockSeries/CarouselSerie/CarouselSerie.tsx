"use client";

import Image from "next/image";
import Link from "next/link";
import { ActionsButtons } from "@/components/Shared/ActionButtons";
import { ChaptersInfo } from "@/components/Shared/ChaptersInfo";
import { FilmGenres } from "@/components/Shared/FilmGenres";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
    <Carousel className="w-full">
      <CarouselContent className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide px-1 w-screen max-w-full touch-pan-x">
        {series.map((serie) =>
          serie.isMoreCard ? (
            <CarouselItem
              key="ver-mas"
              className="basis-[45%] sm:basis-[35%] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 transition group relative"
            >
              <Link href="/series">
                <div className="relative aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-md flex items-center justify-center text-white font-bold text-center text-lg hover:scale-105 transition-transform">
                  Ver más
                </div>
              </Link>
            </CarouselItem>
          ) : (
            <CarouselItem
              key={serie.id}
              className="basis-[45%] sm:basis-[35%] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 transition delay-300 group relative"
            >
              <div className="relative aspect-[2/3] bg-zinc-900 rounded-md overflow-hidden group cursor-pointer">
                <Image
                  src={serie.thumbnailUrl}
                  alt={serie.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 z-10">
                  <h4 className="text-white font-semibold text-sm truncate mb-1">{serie.title}</h4>

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
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
}
