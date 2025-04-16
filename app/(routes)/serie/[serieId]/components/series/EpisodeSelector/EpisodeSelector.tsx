"use client";

import { useState } from "react";
import { Season } from "./EpisodeSelector.types";
import { MovieVideo } from "../MovieVideo";

interface EpisodeSelectorProps {
  seasons: Season[];
}

export function EpisodeSelector({ seasons }: EpisodeSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  const handleSeasonChange = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(null);
  };

  const handleEpisodeChange = (episodeVideoUrl: string) => {
    setSelectedEpisode((prev) => (prev === episodeVideoUrl ? null : episodeVideoUrl));
  };

  const selectedSeasonData = seasons.find((season) => season.number === selectedSeason);

  return (
    <div>
      {/* Selector de temporadas */}
      <div className="my-10 mx-5">
        <label htmlFor="seasons" className="mr-2 font-semibold">
          Selecciona una temporada:
        </label>
        <select
          id="seasons"
          className="p-3 border rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
          value={selectedSeason || ""}
        >
          <option value="" disabled className="text-[#00FFFF]">
            -- Elige una temporada --
          </option>
          {seasons.map((season) => (
            <option key={season.id} value={season.number}>
              Temporada {season.number}
            </option>
          ))}
        </select>
      </div>

      {/* Episodios mostrados en columna con render condicional del video */}
      {selectedSeasonData && (
        <div className="my-6">
          <h2 className="text-xl font-bold mb-4">Episodios de la Temporada {selectedSeason}</h2>
          <div className="flex flex-col gap-4">
            {selectedSeasonData.episodes.map((episode) => (
              <div key={episode.id}>
                <div
                  onClick={() => handleEpisodeChange(episode.videoUrl)}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-lg bg-zinc-900"
                >
                  <h3 className="font-bold">{episode.title}</h3>
                  <p>{episode.duration}</p>
                </div>

                {/* Reproductor*/}
                {selectedEpisode === episode.videoUrl && (
                  <div className="mt-4 w-full max-w-[800px] mx-auto">
                    <h3 className="text-lg font-semibold mb-2 text-center">Reproduciendo:</h3>
                    <MovieVideo currentMovie={episode.videoUrl} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
