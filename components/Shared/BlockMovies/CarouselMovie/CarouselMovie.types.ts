import { Movie } from "@prisma/client";

export type ExtendedMovie = Movie & {
  isMoreCard?: boolean;
};

export type CarouselMovieProps = {
  movies: ExtendedMovie[];  // ← AQUÍ está el cambio clave
  isMyList: boolean;
};
