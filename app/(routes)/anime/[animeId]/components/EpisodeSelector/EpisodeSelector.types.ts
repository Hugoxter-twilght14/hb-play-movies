// components/EpisodeSelector/EpisodeSelector.types.ts

export interface Episode {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
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
