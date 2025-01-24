import { z } from "zod"

export const formSchema = z.object({
    email: z.string().min(2, {
        message: "El correo es incorrecto, verificalo e intentalo de nuevo.",
    }),
    password: z.string().min(2, {
        message: "Contraseña incorrecta, verificalo e intentalo de nuevo.",
    })
  });