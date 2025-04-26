import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(
  _req: Request,
  { params }: { params: { tipo: string; id: string } }
) {
  const { tipo, id } = params

  try {
    let contenido = null

    if (tipo === "pelicula") {
      contenido = await db.movie.findUnique({ where: { id } })
    } else if (tipo === "anime") {
      contenido = await db.anime.findUnique({ where: { id } })
    } else if (tipo === "serie") {
      contenido = await db.serie.findUnique({ where: { id } })
    }

    if (!contenido) {
      return NextResponse.json(
        { message: "Contenido no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(contenido)
  } catch (error) {
    console.error("❌ Error en GET contenido único:", error)
    return NextResponse.json(
      { message: "Error al cargar contenido" },
      { status: 500 }
    )
  }
}
