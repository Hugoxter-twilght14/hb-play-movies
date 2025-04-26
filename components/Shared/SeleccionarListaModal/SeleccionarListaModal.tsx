"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CrearListaModal } from "../CrearListaModal"

interface Lista {
  id: string
  nombre: string
  descripcion?: string | null
}

interface SeleccionarListaModalProps {
  perfilId: string
  contenidoId: string
  tipo: "pelicula" | "anime" | "serie"
  trigger: React.ReactNode
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SeleccionarListaModal({
  perfilId,
  contenidoId,
  tipo,
  trigger,
  onSuccess,
  open,
  onOpenChange,
}: SeleccionarListaModalProps) {
  const [listas, setListas] = useState<Lista[]>([])
  const [loading, setLoading] = useState(false)
  const [crearOpen, setCrearOpen] = useState(false)
  const { toast } = useToast()

  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = typeof open === "boolean"
  const dialogOpen = isControlled ? open : internalOpen
  const setDialogOpen = isControlled && onOpenChange ? onOpenChange : setInternalOpen

  const fetchListas = async () => {
    try {
      const res = await fetch(`/api/listas/perfil/${perfilId}`)
      const data: Lista[] = await res.json()
      if (res.ok) {
        setListas(data)
      } else {
        throw new Error("Error al cargar listas")
      }
    } catch (error: unknown) {
      const err = error as Error
      toast({
        title: "Error",
        description: err.message || "No se pudieron cargar las listas",
        variant: "destructive",
      })
    }
  }

  const handleAgregarContenido = async (listaId: string) => {
    setLoading(true)
    try {
      const res = await fetch("/api/listas/contenido", {
        method: "POST",
        body: JSON.stringify({ listaId, contenidoId, tipo }),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Error al agregar contenido")
      }

      toast({
        title: "Contenido añadido",
        description: "Se ha añadido el contenido a la lista.",
      })

      setDialogOpen(false)
      onSuccess?.()
    } catch (error: unknown) {
      const err = error as Error
      toast({
        title: "Error",
        description: err.message || "No se pudo añadir",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAbrirCrear = () => {
    setDialogOpen(false)
    setTimeout(() => setCrearOpen(true), 300)
  }

  useEffect(() => {
    if (dialogOpen) fetchListas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen])

  return (
    <>
      {/* MODAL 1 - Seleccionar Lista */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecciona una lista</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {listas.length > 0 ? (
              listas.map((lista) => (
                <Button
                  key={lista.id}
                  variant="outline"
                  className="w-full justify-start"
                  disabled={loading}
                  onClick={() => handleAgregarContenido(lista.id)}
                >
                  {lista.nombre}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tienes listas creadas aún.</p>
            )}
          </div>

          <DialogFooter className="mt-6 flex flex-col gap-2">
            {listas.length < 5 && (
              <Button variant="secondary" className="w-full" onClick={handleAbrirCrear}>
                Crear nueva lista
              </Button>
            )}
            <Button variant="ghost" onClick={() => setDialogOpen(false)} className="w-full">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2 - Crear Lista */}
      <CrearListaModal
        open={crearOpen}
        onOpenChange={setCrearOpen}
        perfilId={perfilId}
        contenidoId={contenidoId}
        tipo={tipo}
        trigger={<></>}
        onSuccess={() => {
          setCrearOpen(false)
          fetchListas()
          onSuccess?.()
        }}
      />
    </>
  )
}
