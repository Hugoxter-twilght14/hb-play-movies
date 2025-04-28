"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
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
import { formSchema } from "./RegisterForm.form"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
 

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
          repeatPassword: "",
        },
      });
     
      const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
          await axios.post("/api/auth/register", values);
          toast({
            title: "El usuario ha sido registrado de manera exitosa",
          });
          router.push("/profiles");
        } catch(error){
          console.log(error);
          toast({
            title: "Ha ocurrido un error durante el registro de su usuario",
            variant: "destructive",
          });
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Correo electrónico" {...field} className="h-14"/>
                  </FormControl>
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
                    <Input placeholder="Escribir Contraseña" {...field} className="h-14"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetir contraseña*</FormLabel>
                  <FormControl>
                    <Input placeholder="Repite la contraseña nuevamente" {...field} className="h-14"/>
                  </FormControl>
                  <FormDescription>
                    * Campos obligatorios.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-white hover:bg-[#00FFFF] text-black hover:text-black">
                Crear cuenta
            </Button>
          </form>
        </Form>
      );
}
