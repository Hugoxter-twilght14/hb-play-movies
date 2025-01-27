import { Serie, Season, Episode } from "@prisma/client";

export type SerieProps = Serie & {
    seasons: Season[];
};

export type SeasonProps = Season & {
    episodes: Episode[];
};

export type EpisodeProps = Episode;
