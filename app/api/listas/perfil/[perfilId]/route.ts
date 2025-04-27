import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { perfilId: string } }
) {
  try {
    const { perfilId } = params;

    if (!perfilId) {
      return NextResponse.json({ message: "PerfilId requerido" }, { status: 400 });
    }

    const listas = await db.lista.findMany({
      where: { perfilId },
      include: {
        contenidos: true, // solo los IDs guardados
      },
      orderBy: { creadaEn: "desc" },
      take: 5,
    });

    return NextResponse.json(listas);
  } catch (error) {
    console.error("[GET_LISTAS_ERROR]", error);
    return NextResponse.json({ message: "Error al obtener listas" }, { status: 500 });
  }
}
