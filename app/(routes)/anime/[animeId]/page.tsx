import { db } from "@/lib/db";
import { NavbarAnime } from "./components/NavbarAnime";
import { EpisodeSelector } from "./components/EpisodeSelector";
import AnimeInfo from "./components/AnimeInfo/AnimeInfo";

// Generar metadatos (como el título de la página) solo en el servidor
export async function generateMetadata({ params }: { params: { animeId: string } }) {
    try {
        const anime = await db.anime.findUnique({
            where: { id: params.animeId },
            select: {
                title: true, // Solo seleccionamos el título
            },
        });

        return {
            title: anime?.title || "Anime no encontrado",
        };
    } catch (error) {
        console.error("Error al obtener los metadatos:", error);
        return {
            title: "Anime no encontrado",
        };
    }
}

// Componente principal para mostrar el anime y sus episodios
export default async function Page({ params }: { params: { animeId: string } }) {
    try {
        const anime = await db.anime.findUnique({
            where: { id: params.animeId },
            include: {
                seasons: {
                    include: {
                        episodes: true, // Incluir episodios dentro de las temporadas
                    },
                },
            },
        });

        if (!anime) {
            return <div>Anime no encontrado</div>;
        }

        return (
            <div className="pt-2 sm:pt-6 lg:pt-10 pb-8 sm:pb-16 lg:items-center lg:pb-20">
                <NavbarAnime title={anime.title} />

                <AnimeInfo
                    title={anime.title}
                    thumbnailUrl={anime.thumbnailUrl}
                    genre={anime.genre}
                    age={anime.age}
                    duration={anime.duration}
                    trailerVideo={anime.trailerVideo}
                    description={anime.description}
                    type={anime.type}
                />

                {/* Componente para seleccionar temporada y episodio */}
                <EpisodeSelector anime={anime} />
            </div>
        );
    } catch (error) {
        console.error("Error al cargar el anime:", error);
        return <div>Error al cargar el anime. Inténtalo de nuevo más tarde.</div>;
    }
}
