"use client"
import { Button } from "@/components/ui/button";
import { ActionsButtonFilmProps } from "./ActionsButtonFilm.types";
import { useRouter } from "next/navigation";
import { ChevronDown, Icon, Play } from "lucide-react";

export function ActionsButtonsFilm(props: ActionsButtonFilmProps) {
    const {idFilm} = props;
    const router = useRouter();
    const onPlayButton=()=>{
        router.push(`/movie/${idFilm}`);
    };
  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-2 ">
        <Button
        size="icon"
        variant="ghost"
        className="bg-slate-50 rounded-full flex items-center justify-center h-7 w-7"
        onClick={onPlayButton}>
          <Play className="text-zinc-900 h-3 w-3 fill-zinc-900"></Play>
        </Button>
      </div>
      <Button
      size="icon"
      variant="ghost"
      className="bg-zinc-900 border-2 border-gray-400 rounded-full 
      flex items-center justify-center h-7 w-7 hover:bg-transparent hover:border-slate-50">
        <ChevronDown width={10} height={10} 
        className="text-slate-50 h-3 w-3"></ChevronDown>
      </Button>
    </div>
  )
}
