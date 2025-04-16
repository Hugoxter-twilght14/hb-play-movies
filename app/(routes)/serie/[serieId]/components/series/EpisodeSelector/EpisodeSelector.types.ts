export interface Server {
    name: string;
    url: string;
  }
  
  export interface Episode {
    id: string;
    number: number;
    title: string;
    duration: string;
    servers: Server[];
  }
  
  export interface Season {
    id: string;
    number: number;
    episodes: Episode[];
  }
  