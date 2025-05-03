// PerfilInitializer.tsx
"use client";
import { useInitPerfil } from "@/hooks/useInitPerfil";

export function PerfilInitializer() {
  useInitPerfil(); // ✅ Siempre se llama, pero internamente decide si correr o no
  return null;
}
