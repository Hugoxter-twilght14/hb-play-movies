import Link from "next/link";
import { BlockAnimesProps } from "./BlockAnimes.types";
import Image from "next/image";

export function BlockAnimes({ animes }: BlockAnimesProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animes.map((anime) => (
                <Link href={`/anime/${anime.id}`} key={anime.id}>
                    <Image
                        src={anime.thumbnailUrl}
                        alt={anime.title}
                        width={300}
                        height={200}
                        className="rounded-md cursor-pointer transition-transform transform hover:scale-105 w-full h-auto"
                    />
                </Link>
            ))}
        </div>
    );
}
