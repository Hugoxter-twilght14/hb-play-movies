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
      <CarouselContent className="ml-1 gap-2 overflow-x-scroll overflow-y-hidden scrollbar-hide">
        {series.map((serie) =>
          serie.isMoreCard ? (
            <CarouselItem
              key="ver-mas"
              className="pl-1 md:basis-1/2 lg:basis-1/5 transition group relative"
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
              className="pl-1 md:basis-1/2 lg:basis-1/5 transition delay-300 group relative"
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
