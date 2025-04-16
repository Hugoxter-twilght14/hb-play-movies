"use client";

import { useState } from "react";
import { Season } from "./EpisodeSelector.types";
import { MovieVideo } from "../MovieVideo";

interface EpisodeSelectorProps {
  seasons: Season[];
}

export function EpisodeSelector({ seasons }: EpisodeSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);

  const handleSeasonChange = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisodeId(null);
  };

  const handleEpisodeClick = (episodeId: string) => {
    setSelectedEpisodeId((prev) => (prev === episodeId ? null : episodeId));
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

      {selectedSeasonData && (
        <div className="my-6">
          <h2 className="text-xl font-bold mb-4">
            Episodios de la Temporada {selectedSeason}
          </h2>
          <div className="flex flex-col gap-4">
            {selectedSeasonData.episodes.map((episode) => (
              <div key={episode.id}>
                <div
                  onClick={() => handleEpisodeClick(episode.id)}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-lg bg-zinc-900"
                >
                  <h3 className="font-bold">{episode.title}</h3>
                  <p>{episode.duration}</p>
                </div>

                {selectedEpisodeId === episode.id && (
                  <div className="mt-4 w-full max-w-[800px] mx-auto">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Reproduciendo:
                    </h3>
                    <MovieVideo servers={episode.servers} />
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
