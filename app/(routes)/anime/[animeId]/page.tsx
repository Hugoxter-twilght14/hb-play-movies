import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavbarAnime } from "./components/NavbarAnime";
import { EpisodeSelector } from "./components/EpisodeSelector";
import AnimeInfo from "./components/AnimeInfo/AnimeInfo";
import type { Server } from "./components/EpisodeSelector/EpisodeSelector.types";

export async function generateMetadata({ params }: { params: { animeId?: string } }) {
  try {
    if (!params?.animeId || typeof params.animeId !== "string") {
      return { title: "Anime no encontrado" };
    }

    const anime = await db.anime.findUnique({
      where: { id: params.animeId },
      select: { title: true },
    });

    return {
      title: anime?.title || "Anime no encontrado",
    };
  } catch (error) {
    console.error("❌ Error al generar metadatos:", error);
    return { title: "Anime no encontrado" };
  }
}

export default async function Page({ params }: { params: { animeId?: string } }) {
  if (!params?.animeId || typeof params.animeId !== "string" || params.animeId.trim() === "") {
    redirect("/");
  }

  let anime = null;

  try {
    anime = await db.anime.findUnique({
      where: { id: params.animeId },
      include: {
        seasons: {
          include: { episodes: true },
        },
      },
    });
  } catch (error) {
    console.error("❌ Error en la consulta del anime:", error);
    redirect("/");
  }

  if (!anime) {
    redirect("/");
  }

  const parsedAnime = {
    ...anime,
    seasons: anime.seasons.map((season) => ({
      ...season,
      episodes: season.episodes.map((ep) => ({
        ...ep,
        servers: Array.isArray(ep.servers) ? (ep.servers as unknown as Server[]) : [],
      })),
    })),
  };

  return (
    <div className="pt-2 sm:pt-6 lg:pt-10 pb-8 sm:pb-16 lg:items-center lg:pb-20">
      <NavbarAnime title={anime.title} />

      <AnimeInfo
        id={anime.id}
        title={anime.title}
        thumbnailUrl={anime.thumbnailUrl}
        genre={anime.genre}
        age={anime.age}
        duration={anime.duration}
        trailerVideo={anime.trailerVideo}
        description={anime.description}
        type={anime.type}
        sliderUrl={anime.sliderUrl}
        actores={anime.actores}
        audio={anime.audio}
        anio={anime.anio}
      />

      <EpisodeSelector anime={parsedAnime} />
    </div>
  );
}
