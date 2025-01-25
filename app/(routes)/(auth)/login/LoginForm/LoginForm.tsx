"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./LoginForm.form"
import { useState } from "react"
import FormError from "./FormError/FormError"
import { login } from "@/actions/login"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


export function LoginForm() {
    const router = useRouter();
    const[error, setError] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:"",
        },
      });

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          login(values).then((data) => {
            setError(data?.error)
            if(data?.success){
              toast({
                title: "Inicio de sesión exitosó",
              });
            }
            router.push("/profiles");
          });

        } catch (error) {
          console.log(error);
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu correo" {...field} className="h-14 text-white" />
                  </FormControl>
                  <FormDescription>
                    Es el correo que usaste para crear tu cuenta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña*</FormLabel>
                  <FormControl>
                    <Input placeholder="Escribe tu contraseña" {...field} type="password" className="h-14 text-white" />
                  </FormControl>
                  <FormDescription>
                    ES la contraseña que ingresaste al crear tu cuenta.
                    * campos obligatorios.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error}/>
            <Button type="submit" className="w-full bg-[#00FFFF] text-black hover:text-white">
                Inciar Sesión
            </Button>
          </form>
        </Form>
      );
}
