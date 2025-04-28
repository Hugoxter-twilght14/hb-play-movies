"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lista, ListaContenido } from "@prisma/client"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { EditarListaModal } from "@/components/Shared/EditarListaModal"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

interface Props {
  lista: Lista & { contenidos: ListaContenido[] }
  onRefresh?: () => void
}

export function ListaItem({ lista, onRefresh }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const eliminarLista = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/listas/${lista.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al eliminar la lista")
      }

      toast({
        title: "Lista eliminada",
        description: "La lista se eliminó correctamente.",
      })

      if (onRefresh) {
        onRefresh()
      } else {
        router.refresh()
      }
    } catch (err: unknown) {
      const error = err as Error
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la lista",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-xl p-4 relative bg-black hover:bg-zinc-900">
      <Link href={`/mi-lista/${lista.id}`}>
        <h2 className="text-lg font-semibold text-white">{lista.nombre}</h2>
        {lista.descripcion && (
          <p className="text-sm text-muted-foreground">{lista.descripcion}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {lista.contenidos?.length ?? 0} contenido
          {lista.contenidos?.length !== 1 ? "s" : ""} guardado
        </p>
      </Link>

      <div className="flex gap-2 mt-3">
        {/* Botón para editar */}
        <EditarListaModal
          lista={lista}
          onSuccess={() => {
            if (onRefresh) onRefresh()
            else router.refresh()
          }}
        />

        {/* Botón para eliminar */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" className=" bg-red-600 hover:bg-red-800 hover:text-black " variant="destructive" disabled={loading}>
              {loading ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar lista?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará la lista y sus contenidos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={eliminarLista} disabled={loading}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
