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
      createdAt: new Date(), // ✅ importante que sea tipo Date si el modelo lo requiere
      typePelicula: "",
      trailerVideo: "",
      isMoreCard: true,
    },
  ];

  return (
    <section className="w-full px-[4%] pt-8 md:pt-[-10px] bg-[#171717]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <div className="w-full overflow-x-auto">
        <CarouselMovie movies={extendedMovies} isMyList={isMyList} />
      </div>
    </section>
  );
}
