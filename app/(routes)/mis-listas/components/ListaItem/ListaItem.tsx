"use client"

import { Lista, ListaContenido } from "@prisma/client"
import { useState } from "react"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

interface Props {
  lista: Lista & { contenidos: ListaContenido[] }
  onRefresh?: () => void
}

export function ListaItem({ lista, onRefresh }: Props) {
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

      if (onRefresh) onRefresh()
    } catch (err: unknown) { // 👈 corregimos any por unknown
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
    <div className="border rounded-xl p-4 relative bg-zinc-900">
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
        <Button size="icon" variant="ghost" disabled>
          <Pencil className="w-4 h-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" disabled={loading}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar lista?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará la lista y todos sus contenidos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={eliminarLista}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
