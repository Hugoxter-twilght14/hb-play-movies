// app/api/listas/contenido/check-all/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { perfilId, contenidoIds } = await req.json();

    if (!perfilId || !Array.isArray(contenidoIds) || contenidoIds.length === 0) {
      return NextResponse.json({ message: "PerfilId y contenidoIds requeridos" }, { status: 400 });
    }

    // Buscar cuáles contenidos ya están en las listas del perfil
    const contenidosExistentes = await db.listaContenido.findMany({
      where: {
        lista: {
          perfilId,
        },
        contenidoId: { in: contenidoIds },
      },
      select: {
        contenidoId: true,
      },
    });

    const exists: Record<string, boolean> = {};
    contenidoIds.forEach(id => {
      exists[id] = contenidosExistentes.some(c => c.contenidoId === id);
    });

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("[CHECK_ALL_LISTAS_ERROR]", error);
    return NextResponse.json({ message: "Error al verificar contenido en listas" }, { status: 500 });
  }
}
