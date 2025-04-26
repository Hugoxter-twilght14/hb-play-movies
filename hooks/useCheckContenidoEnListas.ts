"use client"

import { useState, useEffect } from "react"

interface Props {
  perfilId: string
  contenidoIds: string[]
}

interface Result {
  checking: boolean
  existsMap: Record<string, boolean>
}

/**
 * Hook para verificar en una sola consulta qué contenidos están en las listas del perfil.
 */
export function useCheckContenidoEnListas({ perfilId, contenidoIds }: Props): Result {
  const [existsMap, setExistsMap] = useState<Record<string, boolean>>({})
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!perfilId || contenidoIds.length === 0) return

    const checkAll = async () => {
      setChecking(true)
      try {
        const res = await fetch("/api/listas/contenido/check-all", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ perfilId, contenidoIds }),
        })

        const data = await res.json()

        if (res.ok && data.exists) {
          setExistsMap(data.exists)
        } else {
          console.warn("❌ Error al verificar contenidos:", data.message)
        }
      } catch (error) {
        console.error("❌ Error en useCheckContenidoEnListas:", error)
      } finally {
        setChecking(false)
      }
    }

    checkAll()
  }, [perfilId, contenidoIds.join(",")]) // ← evita loops infinitos

  return {
    checking,
    existsMap,
  }
}
