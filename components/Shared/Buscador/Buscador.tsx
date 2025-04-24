"use client";

import { useEffect, useState } from "react";
import { BuscadorLayout } from "./BuscadorLayout/BuscadorLayout";

export interface Contenido {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string[];
  type: "pelicula" | "serie" | "anime";
}

export default function Buscador() {
  const [contenido, setContenido] = useState<Contenido[]>([]);
  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState<"all" | "pelicula" | "serie" | "anime">("all");
  const [genero, setGenero] = useState<string | null>(null);

  useEffect(() => {
    const fetchContenido = async () => {
      try {
        const res = await fetch("/api/contenido");
        const data = await res.json();
        setContenido(data);
      } catch (error) {
        console.error("Error al cargar contenido", error);
      }
    };
    fetchContenido();
  }, []);

  const contenidoFiltrado = contenido.filter((item) => {
    const coincideTexto = item.title.toLowerCase().includes(query.toLowerCase());
    const coincideGenero =
      !genero || item.genre.includes(genero);
    const coincideTipo =
      tipo === "all" || item.type === tipo;

    return coincideTexto && coincideGenero && coincideTipo;
  });

  return (
    <BuscadorLayout
  query={query}
  setQuery={setQuery}
  tipo={tipo}
  setTipo={setTipo}
  genero={genero}
  setGenero={setGenero}
  contenidoFiltrado={contenidoFiltrado}
/>

  );
}
