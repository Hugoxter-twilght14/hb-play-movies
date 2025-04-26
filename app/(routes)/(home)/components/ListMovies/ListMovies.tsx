"use client"

import { useCheckContenidoEnListas } from "@/hooks/useCheckContenidoEnListas"
import { usePerfilId } from "@/hooks/use-perfil-id"
import { BlockMovies } from "@/components/Shared/BlockMovies";
import { ListMoviesProps } from "./ListMovies.types";
import { useLovedFilms } from "@/hooks/use-loved-films";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";

export function ListMovies(props: ListMoviesProps) {
  const { movies } = props;

  const perfilId = usePerfilId()!;
  const {lovedFilmsByUser} = useLovedFilms();
  const {currentUser} = useCurrentNetflixUser();
  const userNetflix = currentUser?.id;
  const lovedFilms = userNetflix ? lovedFilmsByUser[userNetflix] : [];

  const { existsMap, checking } = useCheckContenidoEnListas({
    perfilId,
    contenidoIds: movies.map((movie) => movie.id),
  });

  if (checking) {
    return <div className="text-center text-white">Cargando películas...</div>
  }

  return (
    <div className="mt-16 sm:mt-[110px] md:mt-[40px]">
      <BlockMovies 
        title="Peliculas Recien añadidas" 
        movies={movies} 
        isMyListMap={existsMap} 
      />

      <BlockMovies 
        title="Peliculas que te gustaron" 
        movies={lovedFilms} 
        isMyList={true} 
      />
    </div>
  )
}
