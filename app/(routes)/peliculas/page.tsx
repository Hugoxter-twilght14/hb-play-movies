import { Navbar } from "@/components/Shared/Navbar"
import { SliderVideo } from "./components/SliderVideo"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PaginatedPeliculas } from "./components/PaginatedPeliculas"

export const dynamic = "force-dynamic";

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

      const peliculasRecientes = await db.movie.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      });

  return (
    <div>
    <Navbar users={usersNetflix}/>
    <SliderVideo movies={peliculasRecientes} />
    <PaginatedPeliculas/>
    </div>
  )
}
