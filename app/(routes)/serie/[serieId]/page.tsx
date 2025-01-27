import { db } from "@/lib/db";
import { NavbarFilm } from "./components/series/NavbarFilm";
import { MovieVideo } from "./components/series/MovieVideo";

export default async function Page({ params }: { params: { serieId: string } }) {
    const serie = await db.serie.findUnique({
        where: { id: params.serieId },
        include: { seasons: { include: { episodes: true } } },
    });

    if (!serie) {
        return <div>Serie no encontrada</div>;
    }

    return (
        <div>
            <NavbarFilm title={serie.title} />
            <div className="my-6 pt-24"> {/* Añado pt-24 para evitar la sobreposición con el NavbarFilm */}
                {serie.seasons.map((season) => (
                    <div key={season.id} className="mb-6">
                        <h2 className="text-2xl font-bold">Temporada {season.number}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {season.episodes.map((episode) => (
                                <div key={episode.id} className="p-4 border rounded-lg">
                                    <h3 className="font-bold">{episode.title}</h3>
                                    <MovieVideo currentMovie={episode.videoUrl} />
                                    <p>{episode.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
