"use client"; // Importante: este componente se marca como cliente

import { useState } from "react";
import { Anime } from "./EpisodeSelector.types"; // Importar las interfaces
import { AnimeVideo } from "../AnimeVideo";

export function EpisodeSelector({ anime }: { anime: Anime }) {
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

    const handleSeasonChange = (seasonNumber: number) => {
        setSelectedSeason(seasonNumber);
        setSelectedEpisode(null); // Resetear episodio seleccionado al cambiar de temporada
    };

    const handleEpisodeChange = (episodeVideoUrl: string) => {
        setSelectedEpisode(episodeVideoUrl);
    };

    return (
        <div>
            {/* Barra de selección de temporadas */}
            <div className="my-10 mx-5">
                <label htmlFor="seasons" className="mr-2 font-semibold text-white">Selecciona una temporada:</label>
                <select
                    id="seasons"
                    className="p-3 border rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
                    value={selectedSeason || ""}
                >
                    <option value="" disabled
                    className="text-[#00FFFF]">-- Elige una temporada --</option>
                    {anime.seasons.map((season) => (
                        <option key={season.id} value={season.number}>
                            Temporada {season.number}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostrar episodios solo si una temporada está seleccionada */}
            {selectedSeason && (
                <div className="my-6">
                    <h2 className="text-xl font-bold text-white">Episodios de la Temporada {selectedSeason}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {anime.seasons
                            .find((season) => season.number === selectedSeason)
                            ?.episodes.map((episode) => (
                                <div
                                    key={episode.id}
                                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleEpisodeChange(episode.videoUrl)}
                                >
                                    <h3 className="font-bold text-white">{episode.title}</h3>
                                    <p className="text-gray-400">{episode.duration}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Reproducir el video del episodio seleccionado */}
            {selectedEpisode && (
                <div className="my-6">
                    <h3 className="text-2xl font-semibold text-white">Reproduciendo:</h3>
                    <AnimeVideo currentAnime={selectedEpisode} />
                </div>
            )}
        </div>
    );
}
