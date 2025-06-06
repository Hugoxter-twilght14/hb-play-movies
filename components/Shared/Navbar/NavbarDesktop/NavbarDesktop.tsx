"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Logo } from "@/components/Shared/Logo"
import { itemsNavbar } from "@/data/itemsNavbar"
import Link from "next/link"
import { useScrollPosition } from "@/hooks/UseScrollPosition"
import { NavbarDesktopProps } from "./NavbarDesktop.types"
import { SelectorProfile } from "@/components/Shared/SelectorProfile"

export function NavbarDesktop(props: NavbarDesktopProps) {
  const {users} = props;
  const scrollPosition = useScrollPosition()


  return (
    <div className={cn(
      "z-30 left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300",
      scrollPosition > 20 ? 'bg-black' : 'bg-transparent'
      )}>
        <div className="px-[4%] mx-auto h-full bg-black">
          <div className="flex gap-4 justify-between h-full items-center">
            <div className="flex gap-2 items-center">
              <Logo/>
              <div className="ml-10 flex gap-4">
                {/*Mapeo de secciones*/}
              {itemsNavbar.map((item) => (
                <Link key={item.name} href={item.link} className="hover:text-[#00FFFF] transition-all duration-300">
                  {item.name}
                </Link>
              ))}
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <Link href="/buscador">
                <Search className="cursor-pointer hover:text-[#00FFFF] transition-colors" />
              </Link>
              <div className="flex gap-2 items-center">
                <SelectorProfile users={users}/>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}
