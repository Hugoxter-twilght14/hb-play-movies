import { Navbar } from "@/components/Shared/Navbar";
import { SliderVideo } from "./components/SliderVideo";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PaginatedAnimes } from "./components/PaginatedAnimes";

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
  
   

  const usersAnime = await db.userNetflix.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <Navbar users={usersAnime} />
      {animes.length > 0 && <SliderVideo animes={animes} />}
      <PaginatedAnimes/>
    </div>
  );
}
