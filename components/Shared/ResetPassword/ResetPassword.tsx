"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// 👇 Agrega el tipo correcto a las props
interface ResetPasswordProps {
  token: string;
}

export default function ResetPassword({ token }: ResetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Contraseña actualizada",
          description: "Ahora puedes iniciar sesión con tu nueva contraseña.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudo actualizar.",
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
    <div className="p-6 bg-zinc-900 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded-md border text-black border-gray-400"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 rounded-md border text-black border-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-500 p-2 rounded-md font-semibold"
        >
          Restablecer
        </button>
      </form>
    </div>
  );
}
