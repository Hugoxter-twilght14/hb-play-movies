"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { BlockPeliculas } from "../BlockPeliculas";
import { Movie } from "@prisma/client";

export function PaginatedPeliculas() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/movies/paginated?page=${page}`);
    const data = await res.json();

    if (data.length === 0) {
      setNoMore(true);
    } else {
      setMovies((prev) => {
        const idsPrev = new Set(prev.map((m) => m.id));
        const nuevos = data.filter((m: Movie) => !idsPrev.has(m.id));
        return [...prev, ...nuevos];
      });
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="space-y-6 mt-10">
      <BlockPeliculas movies={movies} />
      <div className="text-center">
        {!noMore ? (
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-cyan-400 hover:text-white transition font-semibold shadow-md"
          >
            {loading ? "Cargando..." : "Ver más"}
          </Button>
        ) : (
          <p className="text-gray-400">No hay más películas</p>
        )}
      </div>
    </div>
  );
}
