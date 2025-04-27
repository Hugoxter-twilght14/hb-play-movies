"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, BookmarkPlus, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePerfilId } from "@/hooks/use-perfil-id";
import { useCheckContenidoEnListas } from "@/hooks/useCheckContenidoEnListas";
import { SeleccionarListaModal } from "@/components/Shared/SeleccionarListaModal";

interface Props {
  filmId: string;
  title?: string;
  type: "pelicula" | "anime" | "serie";
  isMyList?: boolean; // 👈 Esta propiedad es para controlar si el contenido está en la lista
}

export function ActionsButtons({ filmId, type }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const perfilId = usePerfilId();

  const [openSeleccionar, setOpenSeleccionar] = useState(false);
  const [localInList, setLocalInList] = useState<boolean | null>(null); // 👈 Control interno

  const { checking, existsMap } = useCheckContenidoEnListas({
    perfilId: perfilId ?? "",
    contenidoIds: [filmId],
  });

  const isInList = localInList !== null ? localInList : existsMap[filmId] || false;

  const handlePlay = () => {
    router.push(`/${type}/${filmId}`);
  };

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/listas/contenido/eliminar/${filmId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al eliminar");
      }

      toast({
        title: "Eliminado",
        description: "El contenido fue eliminado de tu lista.",
      });

      setLocalInList(false); // 🔥 Actualizamos estado sin recargar
    } catch (error: unknown) {
      const err = error as Error;
      console.error(error);
      toast({
        title: "Error",
        description: err.message || "No se pudo eliminar",
        variant: "destructive",
      });
    }
  };

  if (!perfilId) return null;

  return (
    <div className="flex items-center gap-2 mt-2">
      {/* Botón Play */}
      <Button
        size="icon"
        variant="ghost"
        className="bg-slate-50 rounded-full flex items-center justify-center h-7 w-7"
        onClick={handlePlay}
      >
        <Play className="text-zinc-900 h-3 w-3 fill-zinc-900" />
      </Button>

      {/* Botón Añadir / Eliminar */}
      {checking ? (
        <Button variant="outline" size="sm" disabled>
          Cargando...
        </Button>
      ) : isInList ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="flex items-center gap-1 text-green-500"
        >
          <BookmarkCheck size={16} />
          Eliminar de lista
        </Button>
      ) : (
        <SeleccionarListaModal
          open={openSeleccionar}
          onOpenChange={setOpenSeleccionar}
          contenidoId={filmId}
          tipo={type}
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-white"
            >
              <BookmarkPlus size={16} />
              Añadir a la lista
            </Button>
          }
          onSuccess={() => {
            setLocalInList(true); // 🔥 Marcamos como agregado
          }}
        />
      )}
    </div>
  );
}
