"use client";
import { useRouter } from "next/navigation";

export function ButtonRegresar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 px-4 py-2 bg-white hover:bg-[#00FFFF] text-black rounded-md border border-zinc-600 transition"
    >
      ← Regresar
    </button>
  );
}
