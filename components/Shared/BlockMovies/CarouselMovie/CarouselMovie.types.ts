import { Movie } from "@prisma/client";

export type ExtendedMovie = Omit<Movie, "sliderUrl" | "actores" | "audio" | "anio"> & {
  isMoreCard?: boolean;
  sliderUrl?: string | null;
  actores?: string | null;
  audio?: string | null;
  anio?: number | null;
};

export type CarouselMovieProps = {
  movies: ExtendedMovie[];
  isMyList?: boolean;
  isMyListMap?: Record<string, boolean>; // 👈 También aquí agregamos map
};
