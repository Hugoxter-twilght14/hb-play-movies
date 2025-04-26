import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function DELETE(
  _req: Request,
  { params }: { params: { contenidoId: string } }
) {
  try {
    const { contenidoId } = params

    if (!contenidoId) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 })
    }

    await db.listaContenido.deleteMany({
      where: {
        contenidoId,
      },
    })

    return NextResponse.json({ message: "Eliminado correctamente" })
  } catch (error) {
    console.error("[DELETE_CONTENIDO_LISTA_ERROR]", error)
    return NextResponse.json({ message: "Error al eliminar contenido" }, { status: 500 })
  }
}
