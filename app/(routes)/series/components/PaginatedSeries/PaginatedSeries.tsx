"use client";

import { useState, useEffect, useCallback } from "react";
import { Serie } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { BlockSeries } from "../BlockSeries";

export function PaginatedSeries() {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const fetchSeries = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/series/paginated?page=${page}`);
    const data = await res.json();

    if (data.length === 0) {
      setNoMore(true);
    } else {
      setSeries((prev) => {
        const ids = new Set(prev.map((s) => s.id));
        const nuevos = data.filter((s: Serie) => !ids.has(s.id));
        return [...prev, ...nuevos];
      });
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  return (
    <div className="space-y-6 mt-10">
      <BlockSeries series={series} />
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
          <p className="text-gray-400">No hay más series</p>
        )}
      </div>
    </div>
  );
}
