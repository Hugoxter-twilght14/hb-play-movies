"use client";

import Link from "next/link";
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
      <div className="flex gap-4 px-4 py-6 overflow-x-auto scroll-smooth snap-x scrollbar-hide">
        {animes.map((anime) => (
          <div
            key={anime.isMoreCard ? "ver-mas" : anime.id}
            className="snap-start shrink-0 w-[85%] sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[16.6%] bg-zinc-800 text-white rounded-2xl overflow-hidden border border-zinc-700 shadow-md md:hover:scale-[1.03] transition-transform duration-300"
          >
           {anime.isMoreCard ? (
              <Link href="/animes">
              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl">
                Ver más
              </div>
              </Link>
            ) : (
                <>
                <img
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  loading="lazy"
                  className="w-full aspect-[2/3] object-cover"
                />
                
                <div className="p-4 flex flex-col gap-2">
                  <h4 className="text-base font-semibold truncate">{anime.title}</h4>

                  {anime.description && (
                    <p className="text-gray-300 text-sm line-clamp-3">
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
        ))}
      </div>
    </div>
  );
}
