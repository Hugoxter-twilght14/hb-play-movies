import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { listaId, contenidoId, tipo } = body

    if (!listaId || !contenidoId || !tipo) {
      return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }

    // Validar que no exista duplicado
    const existe = await db.listaContenido.findUnique({
      where: {
        contenidoId_listaId: {
          contenidoId,
          listaId,
        },
      },
    })

    if (existe) {
      return NextResponse.json({ message: "Ya está en la lista" }, { status: 409 })
    }

    const nuevo = await db.listaContenido.create({
      data: {
        listaId,
        contenidoId,
        tipo,
      },
    })

    return NextResponse.json(nuevo)
  } catch (error) {
    console.error("[AGREGAR_CONTENIDO_LISTA_ERROR]", error)
    return NextResponse.json({ message: "Error al añadir contenido" }, { status: 500 })
  }
}
