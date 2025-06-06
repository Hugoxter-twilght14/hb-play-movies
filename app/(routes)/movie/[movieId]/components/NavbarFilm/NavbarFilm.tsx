"use client";
import { ArrowLeft } from 'lucide-react';
import { NavbarFilmProps } from './NavbarFilm.types';
import { useRouter } from 'next/navigation';

export function NavbarFilm(props: NavbarFilmProps) {
    const { title } = props;

    const router = useRouter();
    
  return (
    <button className="fixed flex gap-2 p-5 cursor-pointer items-center z-10 bg-zinc-900/70  mt-[30px]"
        onClick={() => router.push("/peliculas")}>
            <ArrowLeft className='w-6 h-6' />
        <p>
            Estas viendo: 
            <span className='font-bold px-1'>{title}</span>
        </p>
    </button>
  )
}
