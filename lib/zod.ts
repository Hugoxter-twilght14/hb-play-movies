import {object, string } from 'zod';

export const signInSchema = object({
    email: string({required_error:"El email es requerido"})
    .min(2, "El email es requerido").email("Invalid Email"),
    password: string({required_error:"La contraseña es requerida"})
    .min(1,"La contraseña es requerida"),
});