"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Play, BookmarkPlus, BookmarkCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { usePerfilId } from "@/hooks/use-perfil-id"
import { useListasPerfil } from "@/hooks/useListasPerfil" // nuevo hook
import { SeleccionarListaModal } from "@/components/Shared/SeleccionarListaModal"
import { CrearListaModal } from "@/components/Shared/CrearListaModal"

interface Props {
  idFilm: string
  title?: string
  isMyList?: boolean
}

export function ActionsButtonsFilm({ idFilm, isMyList = false }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const perfilId = usePerfilId()

  const [addedToList, setAddedToList] = useState<boolean>(false)
  const [openSeleccionar, setOpenSeleccionar] = useState(false)
  const [openCrear, setOpenCrear] = useState(false)

  const { listas, loading: loadingListas } = useListasPerfil(perfilId ?? "")
  const hasListas = listas.length > 0

  useEffect(() => {
    setAddedToList(isMyList)
  }, [isMyList])

  const onPlayButton = () => {
    router.push(`/movie/${idFilm}`)
  }

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/listas/contenido/eliminar/${idFilm}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || "Error al eliminar")
      }

      toast({
        title: "Eliminado",
        description: "La película fue eliminada de tu lista.",
      })

      setAddedToList(false)
      router.refresh()
    } catch (error: unknown) {
      const err = error as Error
      console.error(err)
      toast({
        title: "Error",
        description: err.message || "No se pudo eliminar",
        variant: "destructive",
      })
    }
  }

  if (!perfilId) return null

  return (
    <div className="flex items-center gap-1 mt-2">
      <Button
        size="icon"
        variant="ghost"
        className="bg-slate-50 rounded-full flex items-center justify-center h-7 w-7"
        onClick={onPlayButton}
      >
        <Play className="text-zinc-900 h-3 w-3 fill-zinc-900" />
      </Button>

      {addedToList ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="flex items-center gap-1 text-green-500 bg-black hover:text-black hover:bg-white"
        >
          <BookmarkCheck size={16} />
          Ya esta en tu lista
        </Button>
      ) : loadingListas ? (
        <Button variant="outline" size="sm" disabled>
          Cargando...
        </Button>
      ) : hasListas ? (
        <SeleccionarListaModal
          open={openSeleccionar}
          onOpenChange={setOpenSeleccionar}
          contenidoId={idFilm}
          tipo="pelicula"
          trigger={
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-white">
              <BookmarkPlus size={16} />
              Añadir a la lista
            </Button>
          }
          onSuccess={() => {
            setAddedToList(true)
            router.refresh()
          }}
        />
      ) : (
        <CrearListaModal
          open={openCrear}
          onOpenChange={setOpenCrear}
          perfilId={perfilId}
          contenidoId={idFilm}
          tipo="pelicula"
          trigger={
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-white">
              <BookmarkPlus size={16} />
              Crear primera lista
            </Button>
          }
          onSuccess={() => {
            setAddedToList(true)
            router.refresh()
          }}
        />
      )}
    </div>
  )
}
