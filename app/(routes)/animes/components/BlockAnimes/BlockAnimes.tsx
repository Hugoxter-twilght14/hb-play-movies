import Link from "next/link";
import { BlockAnimesProps } from "./BlockAnimes.types";
import Image from "next/image";

export function BlockAnimes({ animes }: BlockAnimesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {animes.map((anime) => (
        <Link href={`/anime/${anime.id}`} key={anime.id}>
          <div className="w-full aspect-[2/3] relative rounded-md overflow-hidden group">
            <Image
              src={anime.thumbnailUrl}
              alt={anime.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-semibold text-lg truncate">{anime.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
