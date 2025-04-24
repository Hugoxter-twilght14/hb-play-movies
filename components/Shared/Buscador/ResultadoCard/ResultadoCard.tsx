// ResultadoCard.tsx

import Link from "next/link";
import { Contenido } from "../Buscador"; // asegúrate que apunta a la ruta correcta

interface Props {
  contenido: Contenido;
}

export function ResultadoCard({ contenido }: Props) {
  const ruta =
    contenido.type === "pelicula"
      ? `/movie/${contenido.id}`
      : contenido.type === "serie"
      ? `/serie/${contenido.id}`
      : `/anime/${contenido.id}`;

  return (
    <Link href={ruta}>
      <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md">
        <img
          src={contenido.thumbnailUrl}
          alt={contenido.title}
          className="w-full aspect-[2/3] object-cover"
        />
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{contenido.title}</h3>
          <p className="text-xs text-gray-400 capitalize">{contenido.type}</p>
        </div>
      </div>
    </Link>
  );
}
