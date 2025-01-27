import { Navbar } from "@/components/Shared/Navbar"
import { SliderVideo } from "./components/SliderVideo"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export  default async function page() {
  const session = await auth();
      
        if (!session || !session.user || !session.user.id) {
          return redirect("/login");
        }
      
        const usersNetflix = await db.userNetflix.findMany({
          where: {
            userId: session.user.id,
          },
        });
        //const movies = await db.movie.findMany()
    return (
      <div>
      <Navbar users={usersNetflix}/>
      <SliderVideo/>
      </div>
    )
}
