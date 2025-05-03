import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await currentUser()

    const {profileName, avatarUrl} = await req.json();

    if(!user){
        return new NextResponse("No tienes los permisos para realizar esta acción", {status: 401});
    }

    if(!profileName || !avatarUrl || !user.id){
        return new NextResponse("Datos invalidos", {status: 400});
    }

    const userCreated = await db.userNetflix.create({
        data:{
            profileName,
            avatarUrl,
            userId: user.id,
        }
    });
    return NextResponse.json(userCreated);
}

export async function DELETE(req: Request) {
    const user = await currentUser();
  
    if (!user) {
      return new NextResponse("No tienes los permisos para realizar esta acción", {
        status: 401,
      });
    }
  
    const { userIdNetflix } = await req.json();
  
    if (!userIdNetflix) {
      return new NextResponse("Datos inválidos", { status: 400 });
    }
  
    try {
      // 1. Obtener todas las listas del perfil
      const listas = await db.lista.findMany({
        where: {
          perfilId: userIdNetflix,
        },
        select: {
          id: true,
        },
      });
  
      const listaIds = listas.map((l) => l.id);
  
      // 2. Eliminar todos los contenidos de esas listas
      await db.listaContenido.deleteMany({
        where: {
          listaId: {
            in: listaIds,
          },
        },
      });
  
      // 3. Eliminar las listas
      await db.lista.deleteMany({
        where: {
          perfilId: userIdNetflix,
        },
      });
  
      // 4. Eliminar el perfil
      const userDeleted = await db.userNetflix.delete({
        where: {
          id: userIdNetflix,
        },
      });
  
      return NextResponse.json(userDeleted);
    } catch (error) {
      console.error("Error al eliminar perfil:", error);
      return new NextResponse("Error interno al eliminar perfil", {
        status: 500,
      });
    }
  }
   