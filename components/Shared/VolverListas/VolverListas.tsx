// components/Shared/VolverABoton.tsx
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function VolverListas() {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.push("/mis-listas")
        router.refresh()
      }}
    >
      ← Regresar
    </Button>
  )
}
