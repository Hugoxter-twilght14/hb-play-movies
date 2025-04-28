"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react"; 

interface ResetPasswordProps {
  token: string;
}

export default function ResetPassword({ token }: ResetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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
        setSuccess(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "No se pudo actualizar la contraseña.",
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
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">¡Contraseña actualizada!</h2>
        <p className="mb-8 text-center">Ahora puedes iniciar sesión con tu nueva contraseña.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 px-6 rounded-md"
        >
          Ir a Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-900 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded-md border text-black border-gray-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 rounded-md border text-black border-gray-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

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
