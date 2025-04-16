"use client";
import { MovieVideoProps } from "./MovieVideo.types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function MovieVideo({ currentMovie }: MovieVideoProps) {
  const isEmbedLink =
    currentMovie.includes("yourupload.com/embed") ||
    currentMovie.includes("streamtape.com/e/") ||
    currentMovie.includes("dailymotion.com/embed") ||
    currentMovie.includes("geo.dailymotion.com/player.html") ||
    currentMovie.includes("ok.ru/videoembed");

  return (
    <div className="relative w-full pb-[56.25%]">
      {isEmbedLink ? (
        <iframe
          src={currentMovie}
          allowFullScreen
          allow="autoplay"
          className="absolute top-0 left-0 w-full h-full border-none"
        />
      ) : (
        <ReactPlayer
          url={currentMovie}
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
  );
}
