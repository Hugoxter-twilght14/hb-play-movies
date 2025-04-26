import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function DELETE(
  _req: Request,
  { params }: { params: { listaId: string } }
) {
  try {
    const { listaId } = params

    if (!listaId) {
      return NextResponse.json({ message: "ID requerido" }, { status: 400 })
    }

    // Primero eliminar todos los contenidos ligados
    await db.listaContenido.deleteMany({
      where: { listaId },
    })

    // Luego eliminar la lista
    await db.lista.delete({
      where: { id: listaId },
    })

    return NextResponse.json({ message: "Lista eliminada" })
  } catch (error) {
    console.error("[DELETE_LISTA_ERROR]", error)
    return NextResponse.json({ message: "Error al eliminar lista" }, { status: 500 })
  }
}
