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
    if(!user){
        return new NextResponse("No tienes los permisos para realizar esta acción", {status: 401});
    }
    const {userIdNetflix} = await req.json();

    if(!userIdNetflix){
        return new NextResponse("Datos invalidos", {status: 400});
    }

    const userDeleted = await db.userNetflix.delete({
        where:{
            id: userIdNetflix,
        },
    });
    return NextResponse.json(userDeleted);
}