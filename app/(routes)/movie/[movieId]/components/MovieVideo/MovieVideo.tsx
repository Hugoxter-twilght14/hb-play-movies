"use client";
import { useState } from "react";
import { MovieVideoProps, Server } from "./MovieVideo.types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function MovieVideo({ servers }: MovieVideoProps) {
  const [activeServer, setActiveServer] = useState<Server | null>(
    Array.isArray(servers) && servers.length > 0 ? servers[0] : null
  );

  if (!activeServer) {
    return (
      <div className="text-center text-white font-semibold">
        No hay servidores disponibles para esta película.
      </div>
    );
  }

  const isEmbedLink =
    activeServer.url.includes("yourupload.com/embed") ||
    activeServer.url.includes("streamtape.com/e/") ||
    activeServer.url.includes("dailymotion.com/embed") ||
    activeServer.url.includes("geo.dailymotion.com/player.html") ||
    activeServer.url.includes("hqq.ac/e/") ||
    activeServer.url.includes("ok.ru/videoembed");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Etiqueta y Selector de servidores */}
      <div className="flex flex-wrap justify-center items-center gap-2 text-white font-medium">
        <span>Servidores:</span>
        {servers.map((server) => (
          <button
            key={server.name}
            onClick={() => setActiveServer(server)}
            className={`px-4 py-1 rounded-full text-white ${
              activeServer.name === server.name
                ? "bg-orange-500"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>

      {/* Reproductor */}
      <div className="relative w-full max-w-[900px] mx-auto aspect-video">
        {isEmbedLink ? (
          <iframe
            src={activeServer.url}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            className="absolute top-0 left-0 w-full h-full border-none"
          />
        ) : (
          <ReactPlayer
            url={activeServer.url}
            width="100%"
            height="100%"
            controls
            playing={false}
            muted={false}
            className="absolute top-0 left-0"
            config={{
              file: {
                attributes: { controlsList: "nodownload" },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
