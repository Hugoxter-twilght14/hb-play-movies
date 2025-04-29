"use client";

import { MovieDetailProps } from './MovieDetail.types';
import { MovieVideo } from '../MovieVideo';
import Image from 'next/image';
import { ActionButtonsPage } from '@/components/Shared/ActionButtonsPage';

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="w-full px-6 md:px-12 bg-zinc-900 pt-10 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Imagen de la portada */}
        <div className="w-full md:w-60 lg:w-72">
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Información */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Título y Botón */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-400">{movie.title}</h1>
            <ActionButtonsPage filmId={movie.id} type="pelicula" />
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><span className="font-semibold text-white">Tipo:</span> {movie.typePelicula}</p>
            <p><span className="font-semibold text-white">Duración:</span> {movie.duration}</p>
            {movie.anio && <p><span className="font-semibold text-white">Año:</span> {movie.anio}</p>}
            {movie.audio && <p><span className="font-semibold text-white">Audio:</span> {movie.audio}</p>}
            <p><span className="font-semibold text-white">Edad:</span> {movie.age}+</p>
            {movie.actores && (
              <p className="sm:col-span-2"><span className="font-semibold text-white">Actores:</span> {movie.actores}</p>
            )}
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genre.map((g, idx) => (
              <span key={idx} className="bg-slate-700 rounded-full px-3 py-1 text-xs font-medium">
                {g}
              </span>
            ))}
          </div>

          {/* Sinopsis */}
          <p className="text-gray-400 text-sm leading-relaxed mt-2">
            <span className="font-semibold text-white">Sinopsis:</span> {movie.descriptionPelicula}
          </p>
        </div>

        {/* Trailer */}
        {movie.trailerVideo && (
          <div className="w-full md:w-[320px] mt-6 md:mt-0">
            <h2 className="text-lg font-semibold mb-2 text-center">Tráiler</h2>
            <video controls className="w-full rounded-lg shadow-md">
              <source src={movie.trailerVideo} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        )}
      </div>

      {/* Reproductor */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-white">Ver Película</h3>
        <MovieVideo servers={movie.servers} />
      </div>
    </div>
  );
}
