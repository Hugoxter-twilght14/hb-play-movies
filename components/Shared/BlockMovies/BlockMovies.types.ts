import { Movie } from "@prisma/client";

export type ExtendedMovie = Movie & {
  isMoreCard?: boolean;
};

export type BlockMoviesProps = {
  title: string;
  movies: ExtendedMovie[];
  isMyList: boolean;
};
