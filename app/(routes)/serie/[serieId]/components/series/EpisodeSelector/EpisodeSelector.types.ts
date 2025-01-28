export interface Episode {
    id: string;
    number: number;
    title: string;
    duration: string;
    videoUrl: string;
}

export interface Season {
    id: string;
    number: number;
    episodes: Episode[];
}
