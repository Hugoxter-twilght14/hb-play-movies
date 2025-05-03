// PerfilInitializer.tsx
"use client";

import { useInitPerfil } from "@/hooks/useInitPerfil";
import { usePathname } from "next/navigation";

export function PerfilInitializer() {
  const pathname = usePathname();

  const isPublic =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/olvide-password") ||
    pathname.startsWith("/reset-password");

  if (isPublic) return null;

  useInitPerfil();
  return null;
}
