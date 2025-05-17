import { Navbar } from "@/components/Shared/Navbar"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import ClientAcercaDe from "./components/ClientAcercaDe/ClientAcercaDe";
import InformacionGeneral from "../components/InformacionGeneral/InformacionGeneral";

export default async function AcercaDe() {
      const session = await auth();
    
      if (!session || !session.user || !session.user.id) {
        return redirect("/login");
      }
    
      const usersNetflix = await db.userNetflix.findMany({
        where: {
          userId: session.user.id,
        },
      });
      
  return (
  <div className="min-h-screen flex flex-col justify-between overflow-hidden">
    <Navbar users={usersNetflix} />
    
    <main className="flex-grow">
      <div className="mt-10">
        <InformacionGeneral />
        <ClientAcercaDe />   
      </div>
    </main>
  </div>
);

}