
import React from "react";
import Buscador from "@/components/Shared/Buscador/Buscador"; 
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {

     const session = await auth();
        
          if (!session || !session.user || !session.user.id) {
            return redirect("/login");
          }

  return (
    <div>
      <Buscador />
    </div>
  );
}
