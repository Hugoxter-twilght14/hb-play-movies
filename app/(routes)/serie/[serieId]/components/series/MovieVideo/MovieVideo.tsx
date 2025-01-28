"use client";
import { MovieVideoProps } from "./MovieVideo.types";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function MovieVideo({ currentMovie }: MovieVideoProps) {
    const [playing, setPlaying] = useState(false); // Estado para controlar la reproducción

    // Función para manejar el clic y empezar a reproducir
    const handlePlay = () => {
        setPlaying(true); // Reproducir cuando el usuario hace clic
    };

    return (
        <div
            onClick={handlePlay}
           className="relative w-full pb-[56.25%] shadow-lg"
        >
            {/* Al hacer clic en el contenedor, se reproduce el video */}
            <ReactPlayer
                url={currentMovie}
                loop={true}
                width="100%"
                height="100%"
                playing={playing} // Solo se reproduce si el estado es true
                muted={false}
                controls={true}
                 className="absolute top-0 left-0"
            />
        </div>
    );
}


