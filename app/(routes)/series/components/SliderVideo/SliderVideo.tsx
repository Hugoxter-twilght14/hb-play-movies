"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Serie {
  id: string;
  title: string;
  description: string;
  sliderUrl?: string | null;
}

interface Props {
  series: Serie[];
}

export function SliderVideo({ series }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % series.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [series.length]);

  const serie = series[index];

  return (
    <div
      className="relative w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw] flex items-center justify-start bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url(${serie.sliderUrl})`,
      }}
    >
      <div className="relative flex flex-col items-start px-6 md:px-20 z-10 w-full max-w-[90%]">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{serie.title}</h2>
        <p className="text-base md:text-lg mb-6">{serie.description}</p>
        <div className="flex gap-4">
          <Link href={`/serie/${serie.id}`}>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded">
              Ver ahora
            </button>
          </Link>
          <button className="border border-white text-white font-semibold px-6 py-2 rounded hover:bg-white hover:text-black transition">
            Añadir a mi lista
          </button>
        </div>
      </div>
    </div>
  );
}
