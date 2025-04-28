"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Lista {
  id: string
  nombre: string
  descripcion?: string | null
}

interface EditarListaModalProps {
  lista: Lista
  onSuccess?: () => void
}

export function EditarListaModal({ lista, onSuccess }: EditarListaModalProps) {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState(lista.nombre)
  const [descripcion, setDescripcion] = useState(lista.descripcion || "")
  const [loading, setLoading] = useState(false)

  const handleGuardar = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/listas/update/${lista.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion }),
      })

      if (!res.ok) throw new Error("Error al editar lista")

      toast({ title: "Lista actualizada" })
      setOpen(false)
      onSuccess?.()
    } catch (error: unknown) {
      const err = error as Error
      toast({ title: "Error", description: err.message || "No se pudo actualizar", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button  size="icon" className="bg-white hover:bg-[#00FFFF] text-black">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre" 
            disabled={loading}
          />
          <Input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            disabled={loading}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button disabled={loading} onClick={handleGuardar}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
