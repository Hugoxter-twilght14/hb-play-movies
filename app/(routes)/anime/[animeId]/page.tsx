import { db } from "@/lib/db";
import { NavbarAnime } from "./components/NavbarAnime";
import { EpisodeSelector } from "./components/EpisodeSelector";
import AnimeInfo from "./components/AnimeInfo/AnimeInfo";
import type { Server } from "./components/EpisodeSelector/EpisodeSelector.types"; // asegúrate de importar este tipo

export async function generateMetadata({ params }: { params: { animeId: string } }) {
  try {
    const anime = await db.anime.findUnique({
      where: { id: params.animeId },
      select: {
        title: true,
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

export default async function Page({ params }: { params: { animeId: string } }) {
  try {
    const anime = await db.anime.findUnique({
      where: { id: params.animeId },
      include: {
        seasons: {
          include: {
            episodes: true,
          },
        },
      },
    });

    if (!anime) {
      return <div>Anime no encontrado</div>;
    }

    // ✅ Transformar los servidores para forzar el tipo correcto
    const fixedAnime = {
      ...anime,
      seasons: anime.seasons.map((season) => ({
        ...season,
        episodes: season.episodes.map((ep) => ({
          ...ep,
          servers: Array.isArray(ep.servers) ? (ep.servers as unknown as Server[]) : []
        })),
      })),
    };

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

        {/* ✅ Usar el anime transformado */}
        <EpisodeSelector anime={fixedAnime} />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar el anime:", error);
    return <div>Error al cargar el anime. Inténtalo de nuevo más tarde.</div>;
  }
}
