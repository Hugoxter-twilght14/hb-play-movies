"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function AnimeVideo({ servers = [] }: AnimeVideoProps) {
  if (!servers.length) {
    return (
      <div className="text-center text-white my-10">
        No hay servidores disponibles para este episodio.
      </div>
    );
  }

  const [activeServer, setActiveServer] = useState<Server>(servers[0]);

  const isEmbedLink =
    activeServer.url.includes("yourupload.com/embed") ||
    activeServer.url.includes("streamtape.com/v/") ||
    activeServer.url.includes("dailymotion.com/embed") ||
    activeServer.url.includes("geo.dailymotion.com/player.html") ||
    activeServer.url.includes("ok.ru/videoembed");

  return (
    <div className="space-y-4">
      {/* Etiqueta + Selector de servidores */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-white font-semibold">Servidores:</span>
          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => setActiveServer(server)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeServer.name === server.name
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              {server.name}
            </button>
          ))}
        </div>
      </div>

      {/* Reproductor */}
      <div className="relative w-full max-w-[900px] mx-auto aspect-video">
        {isEmbedLink ? (
          <iframe
            src={activeServer.url}
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-presentation"
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
