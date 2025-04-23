import { BlockMoviesProps } from "./BlockMovies.types";
import { CarouselMovie } from "./CarouselMovie";

export function BlockMovies(props: BlockMoviesProps) {
  const { title, movies, isMyList } = props;

  if (!movies || movies.length === 0) return null;

  const limitedMovies = movies.slice(0, 6);

  const extendedMovies = [
    ...limitedMovies,
    {
      id: "ver-mas",
      title: "Ver más",
      thumbnailUrl: "/img/ver-mas-peliculas.jpg",
      genre: [],
      age: "",
      duration: "",
      descriptionPelicula: "",
      ranking: 0,
      servers: [],
      createdAt: new Date(), // ✔️ ESTA es la forma correcta aquí
      typePelicula: "",
      trailerVideo: "",
      isMoreCard: true,
    },
  ];

  return (
    <div className="-top-16 relative px-[4%] md:pt-20 overflow-auto bg-[#171717]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <CarouselMovie movies={extendedMovies} isMyList={isMyList} />
    </div>
  );
}
