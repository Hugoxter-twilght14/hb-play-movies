import { Navbar } from "@/components/Shared/Navbar";
import { SliderVideo } from "./(routes)/(home)/components/SliderVideo";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { TrendingMovies } from "./(routes)/(home)/components/TrendingMovies";
import { ListMovies } from "./(routes)/(home)/components/ListMovies";
import { BlockAnimes } from "@/components/Shared/BlockAnimes";
import { BlockSeries } from "@/components/Shared/BlockSeries";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }

  const usersNetflix = await db.userNetflix.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const movies = await db.movie.findMany();

  const trendingMovies = await db.popularMovie.findMany({
    orderBy: { ranking: "asc" },
    take: 5,
  });

  const animes = await db.anime.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const series = await db.serie.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const animesRecientes = await db.anime.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const seriesRecientes = await db.serie.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const peliculasRecientes = await db.movie.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const sliderContenido = [
    ...animesRecientes.map((a) => ({
      ...a,
      type: "anime" as const,
      description: a.description,
    })),
    ...seriesRecientes.map((s) => ({
      ...s,
      type: "serie" as const,
      description: s.description,
    })),
    ...peliculasRecientes.map((p) => ({
      ...p,
      type: "pelicula" as const,
      description: p.descriptionPelicula,
    })),
  ]
  


  return (
    <div className="relative bg-zinc-900">
      <Navbar users={usersNetflix} />
      <SliderVideo contenido={sliderContenido} />
      <TrendingMovies movies={trendingMovies} />

      {/* ✅ Sección scroll-friendly y sin conflictos de anchura */}
      <main className="w-full flex flex-col gap-2 px-[4%] mt-20">
        <ListMovies movies={movies} />
        <BlockSeries title="Series recien añadidas" series={series} />
        <BlockAnimes title="Animes Recien añadidos" animes={animes} />
      </main>
    </div>
  );
}
