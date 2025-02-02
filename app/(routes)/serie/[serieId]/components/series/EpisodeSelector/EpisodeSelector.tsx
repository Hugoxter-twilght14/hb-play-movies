"use client"; // Este componente debe ejecutarse en el cliente

import { useState } from "react";
import { Season } from "./EpisodeSelector.types"; // Definir el tipo de Season
import { MovieVideo } from "../MovieVideo";

interface EpisodeSelectorProps {
    seasons: Season[]; // Recibe las temporadas de la serie
}

export function EpisodeSelector({ seasons }: EpisodeSelectorProps) {
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

    const handleSeasonChange = (seasonNumber: number) => {
        setSelectedSeason(seasonNumber);
        setSelectedEpisode(null); // Resetea el episodio al cambiar de temporada
    };

    const handleEpisodeChange = (episodeVideoUrl: string) => {
        setSelectedEpisode(episodeVideoUrl);
    };

    const selectedSeasonData = seasons.find((season) => season.number === selectedSeason);

    return (
        <div>
            {/* Selector de temporadas */}
            <div className="my-10 mx-5">
                <label htmlFor="seasons" className="mr-2 font-semibold">Selecciona una temporada:</label>
                <select
                    id="seasons"
                     className="p-3 border rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
                    value={selectedSeason || ""}
                >
                    <option value="" disabled
                    className="text-[#00FFFF]">-- Elige una temporada --</option>
                    {seasons.map((season) => (
                        <option key={season.id} value={season.number}>
                            Temporada {season.number}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostrar episodios de la temporada seleccionada */}
            {selectedSeasonData && (
                <div className="my-6">
                    <h2 className="text-xl font-bold">Episodios de la Temporada {selectedSeason}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {selectedSeasonData.episodes.map((episode) => (
                            <div
                                key={episode.id}
                                className="p-4 border rounded-lg cursor-pointer hover:shadow-lg"
                                onClick={() => handleEpisodeChange(episode.videoUrl)}
                            >
                                <h3 className="font-bold">{episode.title}</h3>
                                <p>{episode.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reproducción del episodio seleccionado */}
            {selectedEpisode && (
                <div className="my-6">
                    <h3 className="text-2xl font-semibold">Reproduciendo:</h3>
                    <MovieVideo currentMovie={selectedEpisode} />
                </div>
            )}
        </div>
    );
}
