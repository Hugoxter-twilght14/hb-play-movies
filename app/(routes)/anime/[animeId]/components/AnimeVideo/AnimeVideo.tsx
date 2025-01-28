"use client";
import { AnimeVideoProps } from "./AnimeVideo.types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function AnimeVideo({ currentAnime }: AnimeVideoProps) {
    return (
        <div className="relative w-full pb-[56.25%]"> {/* Contenedor con proporción 16:9 */}
            <ReactPlayer
                url={currentAnime}
                loop={true}
                width="100%"
                height="100%"
                playing={false} // Por defecto, no reproducir automáticamente
                muted={false}
                controls={true}
                className="absolute top-0 left-0"
            />
        </div>
    );
}
