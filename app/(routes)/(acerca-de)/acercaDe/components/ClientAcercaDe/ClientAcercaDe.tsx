"use client";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClientAcercaDe() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="bg-white hover:bg-[#00ffff] text-black font-semibold py-3 px-6 rounded-lg flex items-center gap-2"
          onClick={() => router.push("../../../aviso-privacidad")}
        >
          <Info className="w-6 h-6" />
          Aviso de Privacidad
        </Button>

        <Button
          className="bg-white hover:bg-[#00ffff] text-black font-semibold py-3 px-6 rounded-lg flex items-center gap-2"
          onClick={() => router.push("../../../sobre-nosotros")}
        >
          <Info className="w-6 h-6" />
          Sobre PlayMovies
        </Button>
      </div>
    </div>
  );
}
