import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PUT(
  req: Request,
  { params }: { params: { listaId: string } }
) {
  try {
    const { listaId } = params
    const { nombre, descripcion } = await req.json()

    if (!listaId || !nombre) {
      return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }

    const listaActualizada = await db.lista.update({
      where: { id: listaId },
      data: { nombre, descripcion },
    })

    return NextResponse.json(listaActualizada)
  } catch (error) {
    console.error("[PUT_LISTA_ERROR]", error)
    return NextResponse.json({ message: "Error al actualizar la lista" }, { status: 500 })
  }
}
