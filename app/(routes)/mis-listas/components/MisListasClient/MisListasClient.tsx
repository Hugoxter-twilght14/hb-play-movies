"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // 👈 necesario para refresh
import { Lista, ListaContenido } from "@prisma/client"
import { CrearListaModalSimple } from "../CrearListaModalSimple"
import { Button } from "@/components/ui/button"
import { ListaItem } from "../ListaItem"

interface Props {
  perfilId: string
  listas: (Lista & { contenidos: ListaContenido[] })[]
}

export function MisListasClient({ perfilId, listas }: Props) {
  const router = useRouter() // 👈 router
  const [listasState, setListasState] = useState(listas)

  const handleListaActualizada = async () => {
    const res = await fetch(`/api/listas/perfil/${perfilId}`)
    const nuevasListas = await res.json()
    setListasState(nuevasListas)
    router.refresh() // 🚀 fuerza actualizar la página
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-16 md:pt-24 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tus Listas</h1>

        <CrearListaModalSimple
          perfilId={perfilId}
          trigger={<Button>+ Nueva Lista</Button>}
          onSuccess={handleListaActualizada}
        />
      </div>

      {listasState.length === 0 ? (
        <p className="text-muted-foreground">No has creado ninguna lista aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listasState.map((lista) => (
            <ListaItem
              key={lista.id}
              lista={lista}
              onRefresh={handleListaActualizada}
            />
          ))}
        </div>
      )}
    </div>
  )
}
