"use client"

import { useEffect, useState } from "react"

export function usePerfilId() {
  const [perfilId, setPerfilId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("perfilId")
      setPerfilId(id)
    }
  }, [])

  return perfilId
}
