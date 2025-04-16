// components/EpisodeSelector/EpisodeSelector.types.ts

export interface Server {
    name: string;
    url: string;
  }
  
  export interface Episode {
    id: string;
    title: string;
    duration: string;
    servers: Server[];
  }
  
  export interface Season {
    id: string;
    number: number;
    episodes: Episode[];
  }
  
  export interface Anime {
    title: string;
    seasons: Season[];
  }
  