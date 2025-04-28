"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast"; // 👈 Importamos el toast

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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
        setSuccess(true); // ✅ Mostrar pantalla de éxito
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

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">¡Enlace enviado!</h2>
        <p className="mb-8 text-center">
          Te hemos enviado un correo para restablecer tu contraseña.<br />
          Revisa tu bandeja de entrada o la carpeta de spam.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 px-6 rounded-md"
        >
          Volver al login
        </button>
      </div>
    );
  }

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
