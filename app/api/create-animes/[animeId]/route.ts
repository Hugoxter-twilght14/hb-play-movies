import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Manejar el método GET para obtener el anime con sus temporadas y episodios
export async function GET(req: NextRequest, { params }: { params: { animeId: string } }) {
  const animeId = params?.animeId;

  if (!animeId) {
    return NextResponse.json({ message: "animeId es requerido" }, { status: 400 });
  }

  try {
    const anime = await db.anime.findUnique({
      where: {
        id: animeId,
      },
      include: {
        seasons: {
          include: {
            episodes: true,
          },
        },
      },
    });

    if (!anime) {
      return NextResponse.json({ message: "Anime no encontrado" }, { status: 404 });
    }

    return NextResponse.json(anime);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los datos del anime" }, { status: 500 });
  }
}
