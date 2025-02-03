// components/MovieVideo.tsx
"use client"
import { MovieVideoProps } from './MovieVideo.types';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function MovieVideo(props: MovieVideoProps) {
  const { currentMovie } = props;

  return (
    <div className="relative w-full pb-[56.25%]">
      <ReactPlayer
        url={currentMovie}
        loop={true}
        width="100%"
        height="100%"
        playing={false}
        muted={false}
        controls={true}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
