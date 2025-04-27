"use client";

import { SelectorProfileProps } from "./SelectorProfile.types";
import { useRouter } from "next/navigation";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";
import { UserNetflix } from "@prisma/client";
import Image from "next/image";
import { ChevronDown, LogOut, Pencil } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SelectorProfile(props: SelectorProfileProps) {
  const { users } = props;
  const router = useRouter();
  const { changeCurrentUser, currentUser } = useCurrentNetflixUser();

  const onChangeUser = async (userNetflix: UserNetflix) => {
    try {
      // Cambiar usuario actual en cliente
      changeCurrentUser(userNetflix);

      // Actualizar perfil activo en servidor
      const res = await fetch("/api/perfil-actual", {
        method: "POST",
        body: JSON.stringify({ perfilId: userNetflix.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error actualizando perfil activo");

      // Redirigir a Mis Listas
      router.push("/profiles");
    } catch (error) {
      console.error("Error cambiando de perfil:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <Image
            src={currentUser ? currentUser.avatarUrl : "/profiles/profile-1.jpg"}
            alt="Profile Image"
            width={35}
            height={35}
            className="rounded-full"
          />
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-2 bg-black/80 border-transparent rounded-lg">
        {users.map((user) => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => onChangeUser(user)}
            className="flex items-center gap-2 mb-3 group cursor-pointer"
          >
            <Image
              src={user.avatarUrl}
              alt="Profile Image"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-white font-medium group-hover:text-black">
                {user.profileName}
              </p>
              <p className="text-gray-500 text-xs">Cambiar perfil</p>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          className="flex items-center gap-2 mb-3 text-white cursor-pointer"
          onClick={() => router.push("/profiles")}
        >
          <Pencil className="w-4 h-4" />
          Administrar perfiles
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 mb-3 text-white cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
