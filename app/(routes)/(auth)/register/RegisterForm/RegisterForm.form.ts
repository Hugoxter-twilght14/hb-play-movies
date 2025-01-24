import { z } from "zod"

export const formSchema = z.object({
    email: z.string().min(2, {
        message: "Este email es invalido o esta incorrecto"
    }),
    password: z.string().min(2, {
        message: "La contraseña debe contener al menos 6 caracteres."
    }),
    repeatPassword: z.string(),
  }).refine((data)=> data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path:["repeatPassword"],
  });
