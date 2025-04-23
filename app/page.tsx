import { Navbar } from "@/components/Shared/Navbar";
import { SliderVideo } from "./(routes)/(home)/components/SliderVideo";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { TrendingMovies } from "./(routes)/(home)/components/TrendingMovies";
import { ListMovies } from "./(routes)/(home)/components/ListMovies";

// ✅ Nuevos imports
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

  return (
    <div className="relative bg-zinc-900">
      <Navbar users={usersNetflix} />
      <SliderVideo />
      <TrendingMovies movies={trendingMovies} />

      <div className="px-[4%] mt-20 space-y-20 md:space-y-0">
        <ListMovies movies={movies} />

        <BlockSeries title="Series recien añadidas" series={series} />

        <BlockAnimes title="Animes Recien añadidos" animes={animes} />
      </div>
    </div>
  );
}
