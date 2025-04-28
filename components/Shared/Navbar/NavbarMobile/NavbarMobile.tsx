//ESTA CLASE SE DEDICA AL DISEÑO DE LA BARRA DE NAVEGACIÓN EN TELEFONOS
//SE REUTILIZAN LOS COMPONENTES DE PC Y SE IMPORTA EL SHEET CONTENT DE LAS OPCIONES
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Logo } from "@/components/Shared/Logo";
import { Menu, Search } from "lucide-react";
import { itemsNavbar } from "@/data/itemsNavbar";
import Link from "next/link";
import { NavbarMobileProps } from "./NavbarMobile.types";
import { SelectorProfile } from "@/components/Shared/SelectorProfile";

export default function NavbarMobile(props: NavbarMobileProps) {
  const {users} = props;

  return (
    <div className="p-4 flex justify-between">
      <Logo/>

      <Sheet>
  <SheetTrigger>
    <Menu/>
  </SheetTrigger>
  <SheetContent side= "left" className="bg-black">
  {/*Mapeo de las opciones de navegación de PC a telefono */}
   <div className="flex flex-col gap-4">
    {itemsNavbar.map((item) => (
      <Link key={item.name} href={item.link} 
        className="hover:text-[#00FFFF] transition-all duration-300"> 
          {item.name} 
      </Link>
    ))}
   </div>

     {/*Creación de iconos search y notifications de la barra de navegación de PC a telefono */}
   <div className="border-[1px] border-white/70 my-5"/>
   <div className="flex justify-between gap-6 mt-4">
   <Link href="/buscador">
      <Search className="cursor-pointer hover:text-[#00FFFF] transition-colors" />
    </Link>
    <SelectorProfile users={users}/>

   </div>
  </SheetContent>
</Sheet>

    </div>
  );
}
