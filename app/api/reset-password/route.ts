import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Datos incompletos." }, { status: 400 });
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(), // token no expirado
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "El enlace de recuperación es inválido o ha expirado." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null, // limpiar token
        passwordResetExpires: null, // limpiar expiración
      },
    });

    return NextResponse.json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("[RESET_PASSWORD_ERROR]", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}
