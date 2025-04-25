import React from "react";

interface AnimeInfoProps {
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  trailerVideo: string;
  description: string;
  type: string;
  sliderUrl?: string | null;
  actores?: string | null;
  audio?: string | null;
  anio?: number | null;
}

const AnimeInfo: React.FC<AnimeInfoProps> = ({
  title,
  thumbnailUrl,
  genre,
  age,
  duration,
  trailerVideo,
  description,
  type,
  actores,
  audio,
  anio,
}) => {
  return (
    <div className="w-full px-4 md:px-8 bg-[#0e1625] rounded-lg shadow-xl text-white py-10">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Imagen */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full md:w-48 lg:w-60 h-auto rounded-lg shadow-md object-cover"
        />

        {/* Información */}
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-400">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-300">
            <p><span className="font-semibold">Tipo:</span> {type}</p>
            <p><span className="font-semibold">Duración:</span> {duration}</p>
            {anio && <p><span className="font-semibold">Año:</span> {anio}</p>}
            {audio && <p><span className="font-semibold">Audio:</span> {audio}</p>}
            <p><span className="font-semibold">Edad:</span> {age}+</p>
            <p><span className="font-semibold">Géneros:</span> {genre.join(", ")}</p>
            {actores && <p className="sm:col-span-2"><span className="font-semibold">Actores:</span> {actores}</p>}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="font-semibold text-white">Sinopsis:</span> {description}
          </p>
        </div>

        {/* Trailer */}
        {trailerVideo && (
          <div className="w-full md:w-[280px] lg:w-[320px] mt-4 md:mt-0">
            <h2 className="text-lg font-semibold mb-2 text-center">Tráiler</h2>
            <video controls className="w-full rounded-lg shadow-md">
              <source src={trailerVideo} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeInfo;
