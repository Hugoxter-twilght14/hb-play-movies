import { MovieDetailProps } from './MovieDetail.types';
import { MovieVideo } from '../MovieVideo';
import Image from 'next/image';

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="w-full px-4 md:px-8 bg-[#0e1625] rounded-lg shadow-xl text-white py-10">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Imagen */}
        <div className="w-full md:w-48 lg:w-60 h-auto">
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Información */}
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-400">{movie.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-300">
            <p><span className="font-semibold">Tipo:</span> {movie.typePelicula}</p>
            <p><span className="font-semibold">Duración:</span> {movie.duration}</p>
            {movie.anio && <p><span className="font-semibold">Año:</span> {movie.anio}</p>}
            {movie.audio && <p><span className="font-semibold">Audio:</span> {movie.audio}</p>}
            <p><span className="font-semibold">Edad:</span> {movie.age}+</p>
            <p><span className="font-semibold">Géneros:</span> {movie.genre.join(", ")}</p>
            {movie.actores && <p className="sm:col-span-2"><span className="font-semibold">Actores:</span> {movie.actores}</p>}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="font-semibold text-white">Sinopsis:</span> {movie.descriptionPelicula}
          </p>
        </div>

        {/* Tráiler */}
        {movie.trailerVideo && (
          <div className="w-full md:w-[280px] lg:w-[320px] mt-4 md:mt-0">
            <h2 className="text-lg font-semibold mb-2 text-center">Tráiler</h2>
            <video controls className="w-full rounded-lg shadow-md">
              <source src={movie.trailerVideo} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        )}
      </div>

      {/* Reproductor */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-white">Ver Película</h3>
        <MovieVideo servers={movie.servers} />
      </div>
    </div>
  );
}
