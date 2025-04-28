
import nodemailer from "nodemailer";

interface Props {
  email: string;
  token: string;
}

export async function sendResetPasswordEmail({ email, token }: Props) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://hb-play-movies.vercel.app"
      : "http://localhost:3000";

  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"PlayMovies" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Restablece tu contraseña - PlayMovies",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background-color: #0D0D0D; color: white; border-radius: 10px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.pinimg.com/736x/35/86/46/3586463f2883b249899615c0ab0eda63.jpg" alt="Logo PlayMovies" style="width: 80px;">
        </div>
        <h2 style="color: #00FFC6; text-align: center;">¿Olvidaste tu contraseña?</h2>
        <p style="text-align: center; margin-top: 20px;">Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>PlayMovies</strong>.</p>
        <p style="text-align: center;">Haz clic en el botón para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #00FFC6; color: black; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Restablecer contraseña
          </a>
        </div>
        <p style="font-size: 12px; color: gray; text-align: center;">Si tú no solicitaste este cambio, puedes ignorar este mensaje.</p>
        <p style="font-size: 12px; color: gray; text-align: center;">&copy; 2025 PlayMovies. Todos los derechos reservados.</p>
      </div>
    `,
  });
}
