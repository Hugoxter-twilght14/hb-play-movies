"use client";

import { useEffect, useState } from "react";

interface Props {
  tipo: "all" | "pelicula" | "serie" | "anime";
  setTipo: (value: Props["tipo"]) => void;
  genero: string | null;
  setGenero: (value: string | null) => void;
  anio: string | null;
  setAnio: (value: string | null) => void;
}

export function FiltrosCategorias({ tipo, setTipo, genero, setGenero, anio, setAnio }: Props) {
  const generosDisponibles = [
    "Acción", "Aventura", "Comedia", "Drama", "Fantasía",
    "Terror", "Romance", "Ciencia ficción", "Musical", "Crimen"
  ];

  const [años, setAños] = useState<number[]>([]);

  useEffect(() => {
    const añoActual = new Date().getFullYear();
    const listaAños = Array.from({ length: añoActual - 1990 + 1 }, (_, i) => añoActual - i);
    setAños(listaAños);
  }, []);

  return (
    <div className="space-y-6 mt-4 z-10">
      {/* Tipo */}
      <div>
        <label className="font-bold block mb-2">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as Props["tipo"])}
          className="w-full p-2 bg-zinc-800 border border-zinc-600 text-white rounded shadow-md focus:outline-none"
        >
          <option value="all">Todos</option>
          <option value="pelicula">Película</option>
          <option value="serie">Serie</option>
          <option value="anime">Anime</option>
        </select>
      </div>

      {/* Género */}
      <div>
        <label htmlFor="genero" className="font-bold block mb-2">Género</label>
        <select
          id="genero"
          value={genero || ""}
          onChange={(e) => setGenero(e.target.value || null)}
          className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-600 shadow-md focus:outline-none"
        >
          <option value="">Todos</option>
          {generosDisponibles.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Año */}
      <div>
        <label htmlFor="anio" className="font-bold block mb-2">Año</label>
        <select
          id="anio"
          value={anio || ""}
          onChange={(e) => setAnio(e.target.value || null)}
          className="w-full p-2 bg-zinc-800 border border-zinc-600 text-white rounded shadow-md focus:outline-none"
        >
          <option value="">Todos</option>
          {años.map((año) => (
            <option key={año} value={año.toString()}>
              {año}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
