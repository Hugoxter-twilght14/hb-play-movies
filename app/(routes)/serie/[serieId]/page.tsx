import { db } from "@/lib/db";
import { NavbarFilm } from "./components/series/NavbarFilm";
import { EpisodeSelector } from "./components/series/EpisodeSelector";
import SerieInfo from "./components/SerieInfo/SerieInfo";

export default async function Page({ params }: { params: { serieId: string } }) {
    // Obtener la serie con temporadas y episodios desde la base de datos
    const serie = await db.serie.findUnique({
        where: { id: params.serieId },
        include: { seasons: { include: { episodes: true } } },
    });

    // Mostrar mensaje si la serie no existe
    if (!serie) {
        return <div>Serie no encontrada</div>;
    }

    return (
        <div className="pt-2 sm:pt-6 lg:pt-10 pb-8 sm:pb-16 lg:items-center lg:pb-20">
            {/* Navbar con el título de la serie */}
            <NavbarFilm title={serie.title} />

            <SerieInfo
                    title={serie.title}
                    thumbnailUrl={serie.thumbnailUrl}
                    genre={serie.genre}
                    age={serie.age}
                    duration={serie.duration}
                    trailerVideo={serie.trailerVideo}
                />
            
                {/* Selector de temporadas y episodios */}
                <EpisodeSelector seasons={serie.seasons} />
        </div>
    );
}
