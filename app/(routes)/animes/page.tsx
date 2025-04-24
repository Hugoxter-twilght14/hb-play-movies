import { Navbar } from "@/components/Shared/Navbar";
import { SliderVideo } from "./components/SliderVideo";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BlockAnimes } from "./components/BlockAnimes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  
  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }

  const animes = await db.anime.findMany({
    take: 6, 
    orderBy: { createdAt: "desc" },
    include: { seasons: true },
  });
  
   // Obtén los animes de la base de datos
    const animesblock = await db.anime.findMany({
      include: {
        seasons: true, // Incluye las temporadas correctamente
    },
  });

  const usersAnime = await db.userNetflix.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <Navbar users={usersAnime} />
      {animes.length > 0 && <SliderVideo animes={animes} />}
      <BlockAnimes animes={animesblock} />
    </div>
  );
}
