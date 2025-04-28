import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Datos incompletos." }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(), // todavía válido
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Token inválido o expirado." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json({ message: "Contraseña actualizada." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error interno." }, { status: 500 });
  }
}
