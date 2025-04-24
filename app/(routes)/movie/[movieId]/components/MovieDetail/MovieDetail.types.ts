export interface Server {
  name: string;
  url: string;
}

export interface MovieDetailProps {
  movie: {
    id: string;
    title: string;
    thumbnailUrl: string;
    genre: string[];
    actores?: string | null;
    audio?: string | null;
    anio?: number | null;
    age: string;
    duration: string;
    trailerVideo: string;
    typePelicula: string;
    descriptionPelicula: string;
    servers: Server[];
  };
}

