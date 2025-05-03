"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCurrentNetflixUser } from "./use-current-user"
import { UserNetflix } from "@prisma/client"

export function useInitPerfil() {
  const { currentUser, changeCurrentUser } = useCurrentNetflixUser()
  const pathname = usePathname()

  useEffect(() => {
    const validarPerfil = async () => {
      try {
        if (currentUser) {
          // Validar si el perfil aún existe (consulta ligera)
          const res = await fetch("/api/perfil-actual", { method: "GET" })

          if (res.ok) return

          // Si no existe, limpiar localStorage y redirigir
          localStorage.removeItem("current-netflix-user")
          if (pathname !== "/profiles") window.location.href = "/profiles"
          return
        }

        // Si no hay perfil cargado aún, intenta cargarlo desde la API
        const res = await fetch("/api/perfil-actual", { method: "GET" })
        if (!res.ok) {
          if (pathname !== "/profiles") window.location.href = "/profiles"
          return
        }

        const perfil: UserNetflix = await res.json()
        changeCurrentUser(perfil)
      } catch (error) {
        console.error("Error al inicializar perfil:", error)
        if (pathname !== "/profiles") window.location.href = "/profiles"
      }
    }

    validarPerfil()
  }, [currentUser, changeCurrentUser, pathname])
}
