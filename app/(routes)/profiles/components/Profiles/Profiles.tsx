"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AddProfile } from "./AddProfile";
import { ProfilesProps } from "./Profiles.types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCurrentNetflixUser } from "@/hooks/use-current-user";
import { UserNetflix } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Profiles(props: ProfilesProps) {
  const { users } = props;
  const { changeCurrentUser } = useCurrentNetflixUser();
  const [manageProfiles, setManageProfiles] = useState(false);
  const router = useRouter();

  const onClickUser = async (user: UserNetflix) => {
    try {
      // Guardar en localStorage
      localStorage.setItem("perfilId", user.id);
      localStorage.setItem("perfilChangedAt", Date.now().toString());

      // Actualizar en servidor
      await fetch("/api/perfil-actual", {
        method: "POST",
        body: JSON.stringify({ perfilId: user.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 🔥 ACTUALIZAR el estado global también
      changeCurrentUser(user);

      // Ir al home (refrescando toda la app)
      window.location.href = "/";
    } catch (error) {
      console.error("Error seleccionando perfil:", error);
    }
  };

  const deleteUser = async (userIdNetflix: string) => {
    try {
      await axios.delete("/api/userNetflix", {
        data: { userIdNetflix },
      });

      setManageProfiles(false);
      toast({ title: "Perfil eliminado exitosamente" });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Ha ocurrido un error al eliminar el perfil",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="text-center relative cursor-pointer"
            onClick={() => onClickUser(user)}
          >
            <Image
              src={user.avatarUrl || ""}
              alt={`Profile Image ${user.profileName}`}
              width={140}
              height={140}
              className={cn(
                manageProfiles ? "blur-md" : "",
                "border-transparent hover:border-2 hover:border-white rounded-md"
              )}
            />
            <p className="mt-2 text-gray-500 uppercase text-lg">
              {user.profileName}
            </p>

            <div
              className={cn(
                "top-14 cursor-pointer w-full flex gap-4 items-center justify-center z-20",
                manageProfiles ? "absolute" : "hidden"
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="bg-white rounded-full hover:bg-red-100 p-1">
                    <Trash2 className="w-6 h-6 text-red-600 hover:text-black" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estás seguro que quieres eliminar este perfil?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer y eliminará permanentemente
                      el perfil asociado a tu cuenta.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-green-600 border-green-600 border hover:bg-[#F2F2F2]">
                      Volver
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="text-red-600 border-red-600 border hover:bg-[#F2F2F2]"
                      onClick={() => deleteUser(user.id)}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}

        <AddProfile />
      </div>

      <div className="mt-16 flex items-center justify-center">
        <Button
          variant="outline"
          size="lg"
          className="text-gray-500 border-gray-500"
          onClick={() => setManageProfiles(!manageProfiles)}
        >
          Administrar perfiles
        </Button>
      </div>
    </div>
  );
}
