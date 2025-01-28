import { Navbar } from "@/components/Shared/Navbar";
import { SliderVideo } from "./components/SliderVideo";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BlockAnimes } from "./components/BlockAnimes";

export default async function Home() {
  const session = await auth();
  
  // Si no hay sesión, redirige al login
  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }

 // Obtén los animes de la base de datos
const animes = await db.anime.findMany({
  include: {
    seasons: true, // Incluye las temporadas correctamente
  },
});

  const usersAnime = await db.userNetflix.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div>
      <Navbar users={usersAnime} /> {/* Pasa los usuarios con animes aquí */}
      <SliderVideo />
      <BlockAnimes animes={animes} /> {/* Pasa los animes reales aquí */}
    </div>
  );
}
