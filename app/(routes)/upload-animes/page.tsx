import { Logo } from "@/components/Shared/Logo";
import { NormalAnime } from "./components/NormalAnime";

export default function Page() {
    return (
        <div className="bg-zinc-900 h-full flex flex-col justify-center items-center">
            <Logo />
            <h1 className="text-2xl my-8 font-semibold">Sube tus animes a continuación:</h1>
            <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
                <NormalAnime />
            </div>
        </div>
    );
}
