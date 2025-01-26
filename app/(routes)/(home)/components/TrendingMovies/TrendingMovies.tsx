
import Image from "next/image";
import { TrendingMoviesProps } from "./TrendingMovies.types";
import { InfoExtraFilm } from "./InfoExtraFilm";

export function TrendingMovies(props: TrendingMoviesProps) {
  const { movies } = props;
  
  return (
    <div className="pt-11 md:pt-0 md:-top-24 lg:-top-28 relative px-[4%]">
    <h3 className="text-2xl font-semibold mb-3">
        Lo más visto hoy
    </h3>

    <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <div key={movie.id} className="cursor-pointer transition delay-300 group relative flex items-center justify-start">
                    {/* Número de Ranking a la izquierda de la imagen */}
                    <div className="relative left-[38px] z-20">
                        <Image
                            src={`https://raw.githubusercontent.com/ratasi/images-netflix-clone/refs/heads/main/ranking/${movie.ranking}.png`} 
                            alt={`Ranking ${movie.ranking}`} 
                            width={100} // Ajusta el tamaño según lo necesites
                            height={150}
                            className="h-auto w-auto"/>
                    </div>

                    {/* Imagen de la película */}
                    <div className="relative z-20 ml-[60px] left-[-20px]"> {/* Reducimos el margen para acercarlo */}

                        <Image 
                            src={movie.thumbnailUrl} 
                            alt="Movie Thumbnail" 
                            width={116} 
                            height={150}
                            className="h-auto w-auto md:max-h-[180px] lg:max-h-full"/>
                    </div>

                    {/* Información extra, asegurándonos que esté sobre la imagen */}
                    <div className="absolute top-0 left-0 w-full h-full z-30">
                        <InfoExtraFilm movie={movie} />
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

  );
}
