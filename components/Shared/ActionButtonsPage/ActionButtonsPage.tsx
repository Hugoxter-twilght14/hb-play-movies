"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Play, BookmarkPlus, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePerfilId } from "@/hooks/use-perfil-id";
import { useCheckContenidoEnListas } from "@/hooks/useCheckContenidoEnListas";
import { SeleccionarListaModal } from "@/components/Shared/SeleccionarListaModal";

interface Props {
  filmId: string;
  type: "pelicula" | "anime" | "serie";
}

export function ActionButtonsPage({ filmId, type }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const perfilId = usePerfilId();

  const [openSeleccionar, setOpenSeleccionar] = useState(false);
  const [checking] = useState(false);
  const [isInList, setIsInList] = useState(false);

  const { existsMap } = useCheckContenidoEnListas({
    perfilId: perfilId ?? "",
    contenidoIds: [filmId],
  });

  useEffect(() => {
    if (existsMap && filmId in existsMap) {
      setIsInList(existsMap[filmId]);
    }
  }, [existsMap, filmId]);


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

      setIsInList(false);
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
      {checking ? (
        <Button variant="outline" size="sm" disabled>
          Cargando...
        </Button>
      ) : isInList ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="flex items-center gap-1 text-green-500 hovr:text-black hover:bg-white bg-black"
        >
          <BookmarkCheck size={16} />
           Ya esta en tu lista
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
              className="flex items-center gap-1 text-white hover:text-black hover:bg-white bg-black rounded-full"
            >
              <BookmarkPlus size={16} />
              Añadir a la lista
            </Button>
          }
          onSuccess={() => {
            setIsInList(true);
          }}
        />
      )}
    </div>
  );
}
