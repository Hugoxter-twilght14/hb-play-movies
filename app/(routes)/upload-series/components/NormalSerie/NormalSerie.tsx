"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { dataSeries } from "./NormalSerie.data";
import { toast } from "@/hooks/use-toast";

export function NormalSerie() {
    const [isLoading, setIsLoading] = useState(false);

    const uploadSeries = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/create-series", {
                series: dataSeries,
            });
            toast({
                title: "¡Series subidas correctamente!",
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="border rounded-lg border-white-400 p-6 hover:bg-[#00FFFF] transition-all hover:text-black duration-300">
            <h1 className="text-xl font-bold mb-4">Subir series</h1>
            <Button className="w-full" variant={"outline"} onClick={uploadSeries} disabled={isLoading}>
                Subir series
                <Upload className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}
