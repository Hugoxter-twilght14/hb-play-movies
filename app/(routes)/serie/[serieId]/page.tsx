import { db } from "@/lib/db";
import { NavbarFilm } from "./components/series/NavbarFilm";
import { EpisodeSelector } from "./components/series/EpisodeSelector";
import SerieInfo from "./components/SerieInfo/SerieInfo";
import { Server } from "./components/series/MovieVideo/MovieVideo.types"; // Asegúrate de que este tipo exista

export default async function Page({ params }: { params: { serieId: string } }) {
  const serie = await db.serie.findUnique({
    where: { id: params.serieId },
    include: {
      seasons: {
        include: {
          episodes: true,
        },
      },
    },
  });

  if (!serie) {
    return <div>Serie no encontrada</div>;
  }

  // ✅ Convertir todos los servers de JsonValue a Server[]
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
      />

      <EpisodeSelector seasons={parsedSeasons} />
    </div>
  );
}
