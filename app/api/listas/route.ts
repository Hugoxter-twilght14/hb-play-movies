import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { perfilId, nombre, descripcion } = body

    if (!perfilId || !nombre) {
      console.warn("⚠️ Campos faltantes detectados en backend:", { perfilId, nombre })
      return NextResponse.json({ message: "Campos requeridos faltantes" }, { status: 400 })
    }

    const cantidadListas = await db.lista.count({
      where: { perfilId },
    })

    if (cantidadListas >= 5) {
      return NextResponse.json({ message: "Límite de 5 listas alcanzado" }, { status: 400 })
    }

    const nuevaLista = await db.lista.create({
      data: {
        perfilId,
        nombre,
        descripcion,
      },
    })

    return NextResponse.json(nuevaLista)
  } catch (error) {
    console.error("[CREAR_LISTA_ERROR]", error)
    return NextResponse.json({ message: "Error al crear lista" }, { status: 500 })
  }
}
