// app/api/perfil-actual/route.ts
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookiesStore = cookies()
    const perfilId = cookiesStore.get("perfilId")?.value

    if (!perfilId) {
      return new NextResponse(JSON.stringify({ message: "No hay perfil seleccionado" }), { status: 400 })
    }

    const perfil = await db.userNetflix.findUnique({
      where: { id: perfilId },
    })

    if (!perfil) {
      return new NextResponse(JSON.stringify({ message: "Perfil no encontrado" }), { status: 404 })
    }

    return NextResponse.json(perfil)
  } catch (error) {
    console.error("Error en /api/perfil-actual (GET):", error)
    return new NextResponse(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 })
  }
}

// 🚀 Agrega este POST
export async function POST(req: Request) {
  try {
    const { perfilId } = await req.json()

    if (!perfilId) {
      return new NextResponse(JSON.stringify({ message: "PerfilId requerido" }), { status: 400 })
    }

    cookies().set("perfilId", perfilId)

    return NextResponse.json({ message: "Perfil activo actualizado correctamente." })
  } catch (error) {
    console.error("Error en /api/perfil-actual (POST):", error)
    return new NextResponse(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 })
  }
}
