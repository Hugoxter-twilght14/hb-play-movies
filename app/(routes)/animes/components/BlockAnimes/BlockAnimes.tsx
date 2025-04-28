import Link from "next/link";
import { BlockAnimesProps } from "./BlockAnimes.types";
import Image from "next/image";

export function BlockAnimes({ animes }: BlockAnimesProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
        {animes.map((anime) => (
          <Link href={`/anime/${anime.id}`} key={anime.id}>
            <div className="relative flex flex-col rounded-2xl border border-white/10 overflow-hidden">
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
            <div className="px-2 py-2 bg-black/60 rounded-b-2xl">
              <h3 className="text-white font-semibold text-sm truncate">{anime.title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{anime.type}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}
