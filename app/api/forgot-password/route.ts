import { db } from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/email/sendResetPasswordEmail";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Correo requerido." }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "No existe una cuenta con este correo." }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");

    
    await db.user.update({
      where: { email },
      data: { passwordResetToken: token, passwordResetExpires: new Date(Date.now() + 3600 * 1000) }, // 1 hora
    });

    await sendResetPasswordEmail({ email, token });

    return NextResponse.json({ message: "Correo enviado." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error interno." }, { status: 500 });
  }
}
