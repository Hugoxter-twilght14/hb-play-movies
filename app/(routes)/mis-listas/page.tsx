import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/Shared/Navbar"
import { MisListasClient } from "./components/MisListasClient"

export default async function MisListasPage() {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    return redirect("/login")
  }

  const usersNetflix = await db.userNetflix.findMany({
    where: { userId: session.user.id },
  })

  const perfil = await db.userNetflix.findFirst({
    where: { userId: session.user.id },
    include: {
      listas: {
        include: {
          contenidos: true,
        },
      },
    },
  })

  if (!perfil) return <div className="p-4">No se encontró el perfil del usuario.</div>

  return (
    <>
      <Navbar users={usersNetflix} />
      <MisListasClient perfilId={perfil.id} listas={perfil.listas} />
    </>
  )
}
