"use client"

import useSWR from "swr"

interface Lista {
  id: string
  nombre: string
  descripcion?: string
}

const fetcher = async (url: string): Promise<Lista[]> => {
  const res = await fetch(url)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener listas")
  }

  return data
}

export function useListasPerfil(perfilId: string) {
  const { data, error, isLoading } = useSWR<Lista[]>(
    perfilId ? `/api/listas/perfil/${perfilId}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // ❌ No vuelva a pedir si cambia de pestaña
    }
  )

  return {
    listas: data ?? [],
    loading: isLoading,
    error,
  }
}
