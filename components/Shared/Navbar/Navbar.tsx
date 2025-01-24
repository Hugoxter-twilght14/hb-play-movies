import { NavbarDesktop } from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";
import { NavbarProps } from "./Navbar.types";

export function Navbar(props: NavbarProps) {
  const {users} = props;
  return (
    //Componentes de la barra de navegación para PC y Telefonos
    <nav>
        <div className="hidden mx-auto md:block">
        <NavbarDesktop users={users}/>
       </div> 
       <div className="md:hidden">
        <NavbarMobile users={users}/>
       </div>
    </nav>
  )
}
