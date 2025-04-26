"use client";

import Link from "next/link";
import { useState } from "react";
import { ActionsButtons } from "@/components/Shared/ActionButtons";
import { ChaptersInfo } from "@/components/Shared/ChaptersInfo";
import { FilmGenres } from "@/components/Shared/FilmGenres";
import { usePerfilId } from "@/hooks/use-perfil-id";
import { useCheckContenidoEnListas } from "@/hooks/useCheckContenidoEnListas";

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
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const perfilId = usePerfilId();

  const idsAnimes = animes.filter(a => !a.isMoreCard).map((a) => a.id);
  const { existsMap } = useCheckContenidoEnListas({
    perfilId: perfilId ?? "",
    contenidoIds: idsAnimes
  });

  return (
    <div className="w-full overflow-x-auto max-w-full">
      <div className="flex gap-4 px-4 py-6 overflow-x-auto scroll-smooth snap-x scrollbar-hide">
        {animes.map((anime) => (
          <div
            key={anime.isMoreCard ? "ver-mas" : anime.id}
            className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[16%] bg-zinc-800 text-white rounded-2xl overflow-hidden border border-zinc-700 shadow-md transition-transform duration-300"
          >
            {anime.isMoreCard ? (
              <Link href="/animes">
                <div className="w-full h-full min-h-[250px] flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl">
                  Ver más
                </div>
              </Link>
            ) : (
              <div
                className="relative w-full aspect-[2/3] overflow-hidden cursor-pointer"
                onClick={() =>
                  setActiveIndex(activeIndex === anime.id ? null : anime.id)
                }
              >
                <img
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div
                  className={`absolute top-0 left-0 w-full h-full bg-zinc-900/95 p-4 flex flex-col gap-2 z-10 transition-all duration-300 ${
                    activeIndex === anime.id ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <h4 className="text-base font-semibold truncate">{anime.title}</h4>

                  {anime.description && (
                    <p className="text-gray-300 text-sm line-clamp-2">{anime.description}</p>
                  )}

                  <ActionsButtons
                    filmId={anime.id}
                    title={anime.title}
                    type="anime"
                    isMyList={existsMap[anime.id] || false}
                  />

                  <ChaptersInfo
                    title={anime.title}
                    age={anime.age}
                    duration={anime.duration}
                  />

                  <FilmGenres genres={anime.genre} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
