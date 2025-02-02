"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavbarFilm({ title }: { title: string }) {
    const router = useRouter();

    const backToSeries = () => {
        router.push("/series");
    };

    return (
        <nav className="fixed flex gap-2 p-5 cursor-pointer items-center z-10 bg-zinc-900/70  mt-[-20px]" onClick={backToSeries}>
            <ArrowLeft className="w-6 h-6" />
            <p>
                Estás viendo: <span className="font-bold px-1">{title}</span>
            </p>
        </nav>
    );
}
