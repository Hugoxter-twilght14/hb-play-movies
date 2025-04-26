"use client"

import { useState } from "react"
import { Lista, ListaContenido } from "@prisma/client"
import { CrearListaSimpleModal } from "../CrearListaModalSimple"
import { Button } from "@/components/ui/button"
import { ListaItem } from "../ListaItem"

interface Props {
  perfilId: string
  listas: (Lista & { contenidos: ListaContenido[] })[]
}

export function MisListasClient({ perfilId, listas }: Props) {
  const [listasState, setListasState] = useState(listas)

  const handleListaCreada = async () => {
    const res = await fetch(`/api/listas/perfil/${perfilId}`)
    const nuevasListas = await res.json()
    setListasState(nuevasListas)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-16 md:pt-24 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tus Listas</h1>

        <CrearListaSimpleModal
          perfilId={perfilId}
          trigger={<Button>+ Nueva Lista</Button>}
          onSuccess={handleListaCreada}
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
              onRefresh={handleListaCreada}
            />
          ))}
        </div>
      )}
    </div>
  )
}
