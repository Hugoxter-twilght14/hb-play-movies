// components/MovieDetail.tsx

import { MovieDetailProps } from './MovieDetail.types';
import { MovieVideo } from '../MovieVideo';
import Image from 'next/image';

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="p-4 pt-[100px] bg-gray-900 rounded-lg shadow-lg text-white max-w-9xl mt-[-38px] mx-auto">
      {/* Contenedor responsivo */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Imagen de la película */}
        <div className="w-40 h-60 md:w-48 md:h-72 lg:w-64 lg:h-96">
          <Image
            src={movie.thumbnailUrl}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-full object-cover rounded-lg shadow-md mx-auto"
          />
        </div>

        {/* Información de la película a la derecha */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mt-4">Tipo: {movie.typePelicula}</p>
          <p className="text-sm text-gray-400">Sipnosis: {movie.descriptionPelicula}</p>
          <p className="text-sm text-gray-400">Duración: {movie.duration}</p>
          <p className="text-sm text-gray-400">Edad: {movie.age}+</p>
          <p className="text-sm text-gray-400">Género: {movie.genre.join(", ")}</p>
        </div>

        {/* Tráiler de la película */}
        {movie.trailerVideo && (
          <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-1 transform md:translate-x-[-10px]">
            <h2 className="text-lg font-semibold mb-2 text-center lg:text-left">
              Tráiler
            </h2>
            <video controls className="w-full rounded-lg">
              <source src={movie.trailerVideo} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        )}
      </div>

      {/* Video principal de la película */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Ver Película</h3>
        <div className="aspect-w-16 aspect-h-9">
          <MovieVideo currentMovie={movie.movieVidieo} />
        </div>
      </div>
    </div>
  );
}
