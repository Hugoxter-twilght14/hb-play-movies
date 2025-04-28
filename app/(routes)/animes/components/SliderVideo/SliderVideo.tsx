"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Anime {
  id: string;
  title: string;
  description: string;
  sliderUrl?: string | null;
}

interface Props {
  animes: Anime[];
}

export function SliderVideo({ animes }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % animes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [animes.length]);

  const anime = animes[index];

  return (
    <div
      className="relative w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw] flex items-center justify-start bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url(${anime.sliderUrl})`,
      }}
    >
      <div className="relative flex flex-col items-start px-6 md:px-20 z-10 w-full max-w-[90%]">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{anime.title}</h2>
        <p className="text-base md:text-lg mb-6 line-clamp-3 max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
          {anime.description}
          </p>
        <div className="flex gap-4">
          <Link href={`/anime/${anime.id}`}>
          <button className="bg-[#00FFFF] hover:bg-emerald-600 text-black hover:text-white font-semibold px-6 py-2 rounded">
              Ver ahora
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
