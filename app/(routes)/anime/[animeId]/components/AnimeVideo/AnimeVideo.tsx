"use client";
import { AnimeVideoProps } from "./AnimeVideo.types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function AnimeVideo({ currentAnime }: AnimeVideoProps) {
  const isEmbedLink =
    currentAnime.includes("yourupload.com/embed") ||
    currentAnime.includes("streamtape.com/e/") ||
    currentAnime.includes("dailymotion.com/embed") ||
    currentAnime.includes("geo.dailymotion.com/player.html") ||
    currentAnime.includes("ok.ru/videoembed");

  return (
    <div className="relative w-full pb-[56.25%]">
      {isEmbedLink ? (
        <iframe
          src={currentAnime}
          allowFullScreen
          allow="autoplay"
          className="absolute top-0 left-0 w-full h-full border-none"
        />
      ) : (
        <ReactPlayer
          url={currentAnime}
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
