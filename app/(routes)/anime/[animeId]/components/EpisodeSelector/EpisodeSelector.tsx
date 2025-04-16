"use client";

import { useState } from "react";
import { Anime, Episode } from "./EpisodeSelector.types";
import { AnimeVideo } from "../AnimeVideo";

export function EpisodeSelector({ anime }: { anime: Anime }) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const handleSeasonChange = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(null);
  };

  const handleEpisodeChange = (episode: Episode) => {
    setSelectedEpisode((prev) => (prev?.id === episode.id ? null : episode));
  };

  const selectedSeasonData = anime.seasons.find(
    (s) => s.number === selectedSeason
  );

  return (
    <div>
      {/* Selector de temporada */}
      <div className="my-10 mx-5">
        <label htmlFor="seasons" className="mr-2 font-semibold text-white">
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
          {anime.seasons.map((season) => (
            <option key={season.id} value={season.number}>
              Temporada {season.number}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de episodios con reproductor dinámico */}
      {selectedSeasonData && (
        <div className="my-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Episodios de la Temporada {selectedSeason}
          </h2>

          <div className="flex flex-col gap-4">
            {selectedSeasonData.episodes.map((episode) => (
              <div key={episode.id}>
                <div
                  onClick={() => handleEpisodeChange(episode)}
                  className="p-4 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700"
                >
                  <h3 className="font-bold text-white">{episode.title}</h3>
                  <p className="text-gray-400">{episode.duration}</p>
                </div>

                {/* Mostrar video solo si se seleccionó */}
                {selectedEpisode?.id === episode.id && (
                  <div className="mt-4 w-full max-w-[900px] mx-auto">
                    <h3 className="text-lg font-semibold text-white text-center mb-2">
                      Reproduciendo:
                    </h3>
                    {episode.servers?.length > 0 ? (
                      <AnimeVideo servers={episode.servers} />
                    ) : (
                      <p className="text-center text-gray-400">
                        No hay servidores disponibles para este episodio.
                      </p>
                    )}
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
