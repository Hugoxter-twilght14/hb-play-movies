import Link from "next/link";
import { BlockSeriesProps } from "./BlockSeries.types";
import Imagen from "next/image";

export function BlockSeries({ series }: BlockSeriesProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {series.map((serie) => (
                <Link href={`/serie/${serie.id}`} key={serie.id}>
                    <Imagen
                        src={serie.thumbnailUrl}
                        alt={serie.title}
                        width={300} 
                        height={200} 
                        className="rounded-md cursor-pointer transition-transform transform hover:scale-105 w-full h-auto"
                    />
                </Link>
            ))}
        </div>
    );
}
