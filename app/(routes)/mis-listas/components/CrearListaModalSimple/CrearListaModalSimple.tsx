"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

interface CrearListaSimpleModalProps {
  perfilId: string
  trigger: React.ReactNode
  onSuccess?: () => void
}

export function CrearListaSimpleModal({
  perfilId,
  trigger,
  onSuccess,
}: CrearListaSimpleModalProps) {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleCrear = async () => {
    if (!nombre.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Debes ingresar un nombre para la lista.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/listas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          perfilId,
          nombre,
          descripcion,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al crear la lista")
      }

      toast({
        title: "Lista creada",
        description: "La lista se creó correctamente.",
      })

      setNombre("")
      setDescripcion("")
      setOpen(false)

      if (onSuccess) onSuccess()
    } catch (err: unknown) {   // 👈 aquí corregimos any por unknown
      const error = err as Error
      toast({
        title: "Error",
        description: error.message || "Error desconocido",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Button onClick={handleCrear} disabled={loading}>
            {loading ? "Creando..." : "Crear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
