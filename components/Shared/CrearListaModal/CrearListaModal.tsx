"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface CrearListaModalProps {
  perfilId: string
  contenidoId: string
  tipo: "pelicula" | "anime" | "serie"
  trigger: React.ReactNode
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// ✅ Tipado para respuesta de creación de lista
interface ListaResponse {
  id: string
}

export function CrearListaModal({
  perfilId,
  contenidoId,
  tipo,
  trigger,
  onSuccess,
  open,
  onOpenChange,
}: CrearListaModalProps) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = typeof open === "boolean"
  const dialogOpen = isControlled ? open : internalOpen
  const setDialogOpen = isControlled && onOpenChange ? onOpenChange : setInternalOpen

  const handleCrear = async () => {
    if (!perfilId || !nombre.trim()) {
      toast({
        title: "Error",
        description: "Faltan datos. Verifica perfilId y nombre.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const resLista = await fetch("/api/listas", {
        method: "POST",
        body: JSON.stringify({ perfilId, nombre, descripcion }),
        headers: { "Content-Type": "application/json" },
      })

      const lista: ListaResponse = await resLista.json()
      if (!resLista.ok) throw new Error(lista.id || "Error al crear la lista")

      const resContenido = await fetch("/api/listas/contenido", {
        method: "POST",
        body: JSON.stringify({ listaId: lista.id, contenidoId, tipo }),
        headers: { "Content-Type": "application/json" },
      })

      if (!resContenido.ok) throw new Error("Error al añadir contenido.")

      toast({
        title: "Lista creada",
        description: "Se ha añadido el contenido a la nueva lista.",
      })

      setDialogOpen(false)
      setNombre("")
      setDescripcion("")
      onSuccess?.()
    } catch (error: unknown) { // ✅ Tipamos bien el error
      const err = error as Error
      toast({
        title: "Error",
        description: err.message || "Error inesperado",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva lista</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Nombre de la lista *"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            disabled={loading}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button disabled={loading} onClick={handleCrear}>
            {loading ? "Creando..." : "Crear y añadir contenido"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
