import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { serieId: string } }) {
    const { serieId } = params;

    try {
        const serie = await db.serie.findUnique({
            where: { id: serieId },
            include: {
                seasons: {
                    include: { episodes: true },
                },
            },
        });

        if (!serie) {
            return new NextResponse("Serie no encontrada", { status: 404 });
        }

        return NextResponse.json(serie);
    } catch (error) {
        console.error("Error al obtener la serie:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
