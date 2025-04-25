"use client";

import { useEffect, useState } from "react";
import { BuscadorLayout } from "./BuscadorLayout/BuscadorLayout";

export interface Contenido {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string[];
  type: "pelicula" | "serie" | "anime";
  anio?: number;
}

export default function Buscador() {
  const [contenido, setContenido] = useState<Contenido[]>([]);
  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState<"pelicula" | "serie" | "anime" | "all">("all");
  const [genero, setGenero] = useState<string | null>(null);
  const [anio, setAnio] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchContenido = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (tipo !== "all") params.append("tipo", tipo);
    if (genero) params.append("genero", genero);
    if (anio) params.append("anio", anio);
    params.append("page", page.toString());

    const res = await fetch(`/api/contenido?${params.toString()}`);
    const data = await res.json();

    if (page === 1) {
      setContenido(data);
    } else {
      setContenido((prev) => [...prev, ...data]);
    }

    setNoMore(data.length < 10);
    setLoading(false);
  };

  useEffect(() => {
    if (query || tipo !== "all" || genero || anio) {
      setPage(1);
      fetchContenido();
    } else {
      setContenido([]);
    }
  }, [query, tipo, genero, anio]);

  useEffect(() => {
    if (page > 1) {
      fetchContenido();
    }
  }, [page]);

  return (
    <BuscadorLayout
      query={query}
      setQuery={setQuery}
      tipo={tipo}
      setTipo={setTipo}
      genero={genero}
      setGenero={setGenero}
      anio={anio}
      setAnio={setAnio}
      contenidoFiltrado={contenido}
      setPage={setPage}
      page={page}
      noMore={noMore}
      loading={loading}
    />
  );
}
