"use client";

import { useState, useEffect, useCallback } from "react";
import { Anime } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { BlockAnimes } from "../BlockAnimes";

export function PaginatedAnimes() {
  const [page, setPage] = useState(1);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const fetchAnimes = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/animes/paginated?page=${page}`);
    const data = await res.json();

    if (data.length === 0) {
      setNoMore(true);
    } else {
      setAnimes((prev) => {
        const idsExistentes = new Set(prev.map((a) => a.id));
        const nuevos = data.filter((a: Anime) => !idsExistentes.has(a.id));
        return [...prev, ...nuevos];
      });
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  return (
    <div className="space-y-6 mt-10">
      <BlockAnimes animes={animes} />
      <div className="text-center">
        {!noMore ? (
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="px-6 py-2 bg-white text-black font-semibold hover:bg-cyan-500 hover:text-white transition-all rounded"
          >
            {loading ? "Cargando..." : "Ver más"}
          </Button>
        ) : (
          <p className="text-gray-400">No hay más animes</p>
        )}
      </div>
    </div>
  );
}
