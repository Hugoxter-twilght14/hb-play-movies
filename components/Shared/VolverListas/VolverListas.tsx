// components/Shared/VolverABoton.tsx
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function VolverListas() {
  const router = useRouter()

  return (
    <Button className="bg-white hover:bg-[#00FFFF] text-black mb-5"
      onClick={() => {
        router.push("/mis-listas")
        router.refresh()
      }}
    >
      ← Regresar
    </Button>
  )
}
