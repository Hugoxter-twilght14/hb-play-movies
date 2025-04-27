"use client";

import { useState, useEffect } from "react";
import { CrearListaModalSimple } from "../CrearListaModalSimple";
import { Button } from "@/components/ui/button";
import { Lista, ListaContenido } from "@prisma/client"; // ✅ IMPORTANTE
import { ListaItem } from "../ListaItem";

interface Props {
  perfilId: string;
}

export function MisListasClient({ perfilId }: Props) {
  const [listas, setListas] = useState<(Lista & { contenidos: ListaContenido[] })[]>([]); // ✅ TYPED
  const [loading, setLoading] = useState(true);

  const fetchListas = async () => {
    try {
      const res = await fetch(`/api/listas/perfil/${perfilId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error cargando listas");
      setListas(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListas();
  }, [perfilId]);

  if (loading) {
    return <div className="text-center text-muted-foreground pt-20">Cargando tus listas...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-16 md:pt-24 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tus Listas</h1>

        <CrearListaModalSimple
          perfilId={perfilId}
          trigger={<Button>+ Nueva Lista</Button>}
          onSuccess={fetchListas}
        />
      </div>

      {listas.length === 0 ? (
        <p className="text-muted-foreground">No has creado ninguna lista aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listas.map((lista) => (
            <ListaItem
              key={lista.id}
              lista={lista}
              onRefresh={fetchListas}
            />
          ))}
        </div>
      )}
    </div>
  );
}
