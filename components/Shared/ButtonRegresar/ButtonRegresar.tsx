"use client";
import { useRouter } from "next/navigation";

export function ButtonRegresar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md border border-zinc-600 transition"
    >
      ← Regresar
    </button>
  );
}
