"use client"
import { BlockMovies } from "@/components/Shared/BlockMovies";
import { ListMoviesProps } from "./ListMovies.types";
import { useLovedFilms } from "@/hooks/use-loved-films";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";

export function ListMovies(props: ListMoviesProps) {
    const {movies} = props;

    const {lovedFilmsByUser} = useLovedFilms();
    const {currentUser} = useCurrentNetflixUser();

    const userNetflix = currentUser?.id;
    const lovedFilms = userNetflix ? lovedFilmsByUser[userNetflix] : [];

  return (
    <div className="mt-16 sm:mt-[110px] md:mt-[40px]"> {/* Solo aplica en tablets y teléfonos */}
      <BlockMovies title="Recien Agregadas" 
      movies={movies} 
      isMyList={false}/>

      <BlockMovies 
      title="Mi Lista"
      movies={lovedFilms}
      isMyList={true}/>
    </div>
  )
}
