"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface Props {
  contenidoId: string
  tipo: "pelicula" | "anime" | "serie"
}

// ✅ Tipamos el contenido de forma segura
interface ContenidoData {
  id: string
  title: string
  thumbnailUrl: string
}

export function CardContenido({ contenidoId, tipo }: Props) {
  const [data, setData] = useState<ContenidoData | null>(null) // ✅ Tipado correcto
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/contenido/${tipo}/${contenidoId}`)
        if (res.ok) {
          const json: ContenidoData = await res.json()
          setData(json)
        }
      } catch (error: unknown) { // ✅ Tipamos correctamente
        console.error("Error cargando contenido:", error)
      }
    }

    fetchData()
  }, [contenidoId, tipo])

  const handleClick = () => {
    if (tipo === "pelicula") {
      router.push(`/movie/${contenidoId}`)
    } else if (tipo === "anime") {
      router.push(`/anime/${contenidoId}`)
    } else if (tipo === "serie") {
      router.push(`/serie/${contenidoId}`)
    }
  }
  

  const handleRemove = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/listas/contenido/eliminar/${contenidoId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Error al eliminar de la lista")

      toast({ title: "Contenido eliminado", description: "Se ha quitado de tu lista." })
      setVisible(false)
    } catch (error: unknown) { // ✅ Tipamos correctamente
      const err = error as Error
      console.error("❌ Error al eliminar contenido:", err)
      toast({ title: "Error", description: err.message || "No se pudo eliminar.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  if (!data || !visible) return null

  return (
    <div className="relative w-[140px] md:w-[160px] lg:w-[180px] flex flex-col rounded-2xl border border-white/10 overflow-hidden">
      <div className="relative">
        <img
          src={data.thumbnailUrl}
          alt={data.title}
          className="w-full h-[240px] object-cover cursor-pointer"
          onClick={handleClick}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-red-500 hover:text-white transition"
              disabled={loading}
            >
              <Trash2 size={14} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background">
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar de tu lista?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemove} disabled={loading}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="px-2 py-2">
        <h3 className="text-white font-semibold text-sm line-clamp-1">{data.title}</h3>
        <p className="text-xs text-muted-foreground capitalize">{tipo}</p>
      </div>
    </div>
  )
}
