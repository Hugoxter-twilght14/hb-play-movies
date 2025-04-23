export interface Anime {
    id: string;
    title: string;
    thumbnailUrl: string;
    genre: string[];
    age: string;
    duration: string;
  }
  
  export interface BlockAnimesProps {
    title: string;
    animes: Anime[];
  }
  