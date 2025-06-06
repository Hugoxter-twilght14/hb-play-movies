import { db } from "@/lib/db"
import { auth } from "@/auth"
import {redirect} from "next/navigation"
import { Profiles } from "./components/Profiles";


export default async function page() {
  const session = await auth()

  if(!session?.user){
    redirect("/login");
  }

  const userNetflix = await db.userNetflix.findMany({
    where:{
      userId: session?.user?.id,
    },
  });

  return (
    <div className="h-full flex flex-col justify-center items-center bg-zinc-900 px-4 text-center">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
        >¿Quién eres? - Elige tu perfil</h1>
      </div>
      <Profiles users={userNetflix}/>
    </div>
    
  );
}
