import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
export async function GET(
  _req: Request,
  { params }: { params: { tipo: string; id: string } }
) {
  const { tipo, id } = params

  try {
    let contenido

    if (tipo === "pelicula") {
      contenido = await db.movie.findUnique({ where: { id } })
    } else if (tipo === "anime") {
      contenido = await db.anime.findUnique({ where: { id } })
    } else if (tipo === "serie") {
      contenido = await db.serie.findUnique({ where: { id } })
    } else {
      return NextResponse.json({ message: "Tipo inválido" }, { status: 400 })
    }

    if (!contenido) {
      return NextResponse.json({ message: "Contenido no encontrado" }, { status: 404 })
    }

    return NextResponse.json(contenido)
  } catch (error) {
    console.error("[GET_CONTENIDO_LISTA_ERROR]", error)
    return NextResponse.json({ message: "Error al cargar contenido" }, { status: 500 })
  }
}
