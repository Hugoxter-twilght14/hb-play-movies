// components/Shared/BlockSeries.tsx

"use client";

import Link from "next/link";
import { BlockSeriesProps } from "./BlockSeries.types";
import Image from "next/image";

export function BlockSeries({ series }: BlockSeriesProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
        {series.map((serie) => (
          <Link href={`/serie/${serie.id}`} key={serie.id}>
            <div className="relative flex flex-col rounded-2xl border border-white/10 overflow-hidden">
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={serie.thumbnailUrl}
                  alt={serie.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="px-2 py-2 bg-black/60 rounded-b-2xl">
                <p className="text-white font-semibold text-sm truncate">{serie.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{serie.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
