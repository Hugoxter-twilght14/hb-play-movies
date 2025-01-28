"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { dataAnime } from "./NormalAnime.data";
import { toast } from "@/hooks/use-toast";

export function NormalAnime() {
    const [isLoading, setIsLoading] = useState(false);

    const uploadAnimes = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/create-animes", {
                animes: dataAnime,
            });
            toast({
                title: "¡Animes subidos correctamente!",
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="border rounded-lg border-white-400 p-6 hover:bg-[#FFD700] transition-all hover:text-black duration-300">
            <h1 className="text-xl font-bold mb-4">Subir animes</h1>
            <Button
                className="w-full"
                variant={"outline"}
                onClick={uploadAnimes}
                disabled={isLoading}
            >
                Subir animes
                <Upload className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}
