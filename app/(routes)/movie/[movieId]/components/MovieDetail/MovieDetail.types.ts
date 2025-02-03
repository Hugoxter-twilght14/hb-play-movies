// components/MovieDetail.types.ts

export interface MovieDetailProps {
    movie: {
      id: string;
      title: string;
      thumbnailUrl: string;
      genre: string[];
      age: string;
      duration: string;
      movieVidieo: string;
      trailerVideo: string;
      typePelicula: string;
      descriptionPelicula: string;
    };
  }
  