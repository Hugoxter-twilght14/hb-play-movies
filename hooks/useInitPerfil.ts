// useInitPerfil.ts
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCurrentNetflixUser } from "./use-current-user";
import { UserNetflix } from "@prisma/client";

export function useInitPerfil() {
  const { currentUser, changeCurrentUser } = useCurrentNetflixUser();
  const pathname = usePathname();

  useEffect(() => {
    const isPublic =
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/olvide-password") ||
      pathname.startsWith("/reset-password");

    if (isPublic) return;

    const validarPerfil = async () => {
      try {
        if (currentUser) {
          const res = await fetch("/api/perfil-actual", { method: "GET" });
          if (res.ok) return;

          localStorage.removeItem("current-netflix-user");
          if (pathname !== "/profiles") window.location.href = "/profiles";
          return;
        }

        const res = await fetch("/api/perfil-actual", { method: "GET" });
        if (!res.ok) {
          if (pathname !== "/profiles") window.location.href = "/profiles";
          return;
        }

        const perfil: UserNetflix = await res.json();
        changeCurrentUser(perfil);
      } catch (error) {
        console.error("Error al inicializar perfil:", error);
        if (pathname !== "/profiles") window.location.href = "/profiles";
      }
    };

    validarPerfil();
  }, [currentUser, changeCurrentUser, pathname]);
}
