"use client";

import React from "react";
import { ActionButtonsPage } from "@/components/Shared/ActionButtonsPage";

interface SerieInfoProps {
  id: string;
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

const SerieInfo: React.FC<SerieInfoProps> = ({
  id,
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
    <div className="w-full px-6 md:px-12 pt-10 text-white bg-zinc-900">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Imagen de la serie */}
        <div className="w-full md:w-60 lg:w-72">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Información */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Título + Botón */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-400">{title}</h1>
            <ActionButtonsPage filmId={id} type="serie" />
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><span className="font-semibold text-white">Tipo:</span> {type}</p>
            <p><span className="font-semibold text-white">Duración:</span> {duration}</p>
            {anio && <p><span className="font-semibold text-white">Año:</span> {anio}</p>}
            {audio && <p><span className="font-semibold text-white">Audio:</span> {audio}</p>}
            <p><span className="font-semibold text-white">Edad:</span> {age}+</p>
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap gap-2 mt-2">
            {genre.map((g, idx) => (
              <span key={idx} className="bg-slate-700 rounded-full px-3 py-1 text-xs font-medium">
                {g}
              </span>
            ))}
          </div>

          {/* Actores */}
          {actores && (
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Actores:</span> {actores}
            </p>
          )}

          {/* Sinopsis */}
          <p className="text-gray-400 text-sm leading-relaxed mt-2">
            <span className="font-semibold text-white">Sinopsis:</span> {description}
          </p>
        </div>

        {/* Tráiler */}
        {trailerVideo && (
          <div className="w-full md:w-[320px] mt-6 md:mt-0">
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

export default SerieInfo;
