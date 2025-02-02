import React from "react";

interface SerieInfoProps {
  title: string;
  thumbnailUrl: string;
  genre: string[];
  age: string;
  duration: string;
  trailerVideo: string;
  description: string;  
  type: string;         
}

const SerieInfo: React.FC<SerieInfoProps> = ({
  title,
  thumbnailUrl,
  genre,
  age,
  duration,
  trailerVideo,
  description, 
  type,       
}) => {
  return (
    <div className="p-4 pt-[100px] bg-gray-900 rounded-lg shadow-lg text-white max-w-9xl mt-[-36px] mx-auto">
      {/* Contenedor responsivo */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Imagen */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-40 h-60 object-cover rounded-lg shadow-md mx-auto md:mx-0"
        />

        {/* Información de la serie a la derecha */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-gray-400">Tipo: {type}</p>
          <p className="text-sm text-gray-400">{duration}</p>
          <p className="text-sm text-gray-400 mt-2">Sipnosis: {description}</p>
          <p className="text-sm text-gray-400">Edad: {age}+</p>
          <p className="text-sm text-gray-400">Género: {genre.join(", ")}</p>
        </div>

        {/* Tráiler */}
        {trailerVideo && (
          <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4 transform md:translate-x-[-120px]">
            <h2 className="text-lg font-semibold mb-2 text-center lg:text-left">
              Tráiler
            </h2>
            <video controls className="w-full rounded-lg">
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
