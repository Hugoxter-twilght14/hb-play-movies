import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-extrabold text-2xl text-[#00FFFF]">
      <Image src="/iconos/icono-playmovies.jpg" alt="Logo PlayMovies" title="PlayMovies" width={35} height={35}/>
      <p className="mt-[-38px] mx-[40px]">PlayMovies</p>
    </Link>
  );
}
