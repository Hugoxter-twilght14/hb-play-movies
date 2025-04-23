import { BlockMoviesProps } from "./BlockMovies.types";
import { CarouselMovie } from "./CarouselMovie";

export function BlockMovies(props: BlockMoviesProps) {
  const { title, movies, isMyList } = props;

  if (!movies || movies.length === 0) return null;

  // Mostrar solo las primeras 6 y agregar una tarjeta extra de "ver más"
  const limitedMovies = movies.slice(0, 6);
  const extendedMovies = [
    ...limitedMovies,
    {
      id: "ver-mas",
      title: "Ver más",
      thumbnailUrl: "/img/ver-mas-peliculas.jpg", // Asegúrate de tener esta imagen
      genre: [],
      age: "",
      duration: "",
      descriptionPelicula: "",
      ranking: 0,
      servers: [],
      createdAt: new Date(),
      typePelicula: "",
      trailerVideo: "",
      isMoreCard: true,
    },
  ];

  return (
    <div className="-top-16 relative px-[4%] md:pt-20 md:pd-20 overflow-auto bg-[#171717]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <CarouselMovie movies={extendedMovies} isMyList={isMyList} />
    </div>
  );
}
