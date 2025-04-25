import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavbarFilm } from "./components/series/NavbarFilm";
import { EpisodeSelector } from "./components/series/EpisodeSelector";
import SerieInfo from "./components/SerieInfo/SerieInfo";
import { Server } from "./components/series/MovieVideo/MovieVideo.types";

export default async function Page({ params }: { params: { serieId?: string } }) {
  // ✅ Validación defensiva
  if (!params?.serieId || typeof params.serieId !== "string" || params.serieId.trim() === "") {
    redirect("/series"); // Redirige en vez de renderizar un error suelto
  }

  let serie = null;

  try {
    serie = await db.serie.findUnique({
      where: { id: params.serieId },
      include: {
        seasons: {
          include: { episodes: true },
        },
      },
    });
  } catch (error) {
    console.error("❌ Error al cargar la serie:", error);
    redirect("/");
  }

  if (!serie) {
    redirect("/");
  }

  // ✅ Conversión segura de episodios
  const parsedSeasons = serie.seasons.map((season) => ({
    ...season,
    episodes: season.episodes.map((episode) => ({
      ...episode,
      servers: (episode.servers ?? []) as unknown as Server[],
    })),
  }));

  return (
    <div className="pt-2 sm:pt-6 lg:pt-10 pb-8 sm:pb-16 lg:items-center lg:pb-20">
      <NavbarFilm title={serie.title} />

      <SerieInfo
        title={serie.title}
        thumbnailUrl={serie.thumbnailUrl}
        genre={serie.genre}
        age={serie.age}
        duration={serie.duration}
        trailerVideo={serie.trailerVideo}
        description={serie.description}
        type={serie.type}
        sliderUrl={serie.sliderUrl}
        actores={serie.actores}
        audio={serie.audio}
        anio={serie.anio}
      />

      <EpisodeSelector seasons={parsedSeasons} />
    </div>
  );
}
