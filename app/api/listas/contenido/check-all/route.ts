// app/api/listas/contenido/check-all/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Validar que el body no esté vacío
    const contentLength = req.headers.get("content-length");
    if (!contentLength || parseInt(contentLength) === 0) {
      return NextResponse.json({ message: "Body vacío" }, { status: 400 });
    }

    // Intentar parsear el JSON
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
    }

    const { perfilId, contenidoIds } = body;

    if (!perfilId || !Array.isArray(contenidoIds) || contenidoIds.length === 0) {
      return NextResponse.json(
        { message: "perfilId y contenidoIds requeridos" },
        { status: 400 }
      );
    }

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
    contenidoIds.forEach((id) => {
      exists[id] = contenidosExistentes.some((c) => c.contenidoId === id);
    });

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("[CHECK_ALL_LISTAS_ERROR]", error);
    return NextResponse.json(
      { message: "Error al verificar contenido en listas" },
      { status: 500 }
    );
  }
}
