"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Contenido {
  id: string;
  title: string;
  description: string;
  type: "anime" | "pelicula" | "serie";
  sliderUrl?: string | null;
}

interface Props {
  contenido: Contenido[];
}

export function SliderVideo({ contenido }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % contenido.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [contenido.length]);

  const item = contenido[index];

  const ruta =
    item.type === "anime"
      ? `/anime/${item.id}`
      : item.type === "serie"
      ? `/serie/${item.id}`
      : `/movie/${item.id}`;

  return (
    <div
      className="relative w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw] flex items-center justify-start bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url(${item.sliderUrl})`,
      }}
    >
      <div className="relative flex flex-col items-start px-6 md:px-20 z-10 w-full max-w-[90%]">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h2>
        <p className="text-base md:text-lg mb-6">{item.description}</p>
        <div className="flex gap-4">
          <Link href={ruta}>
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
