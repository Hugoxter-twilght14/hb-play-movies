"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Importamos router
import { toast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter(); // 👈 Creamos instancia del router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "¡Revisa tu correo!",
          description: "Te enviamos un enlace para restablecer tu contraseña.",
        });

        // 🛑 Pequeño delay para que el usuario vea el toast (opcional)
        setTimeout(() => {
          router.push("/login"); // 🚀 Redirigir al login
        }, 2000); // Esperamos 2 segundos

      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudo enviar el correo",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error inesperado.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 bg-black/80 rounded-lg w-full max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded-md border text-black border-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-500 p-2 rounded-md font-semibold"
        >
          Enviar enlace
        </button>
      </form>
    </div>
  );
}
