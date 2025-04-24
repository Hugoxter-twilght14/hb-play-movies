import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  filmId: string;
  title?: string;
  type: "movie" | "anime" | "serie";
  isMyList?: boolean;
}

export function ActionsButtons({ filmId, title, type, isMyList = false }: Props) {
  const router = useRouter();
  const onPlayButton=()=>{
      router.push(`/${type}/${filmId}`);
  };
  const handleClick = () => {
    console.log(`✅ Me gusta: ${type.toUpperCase()} – ${title} (ID: ${filmId})`);
    // Aquí podrías manejar el almacenamiento local o llamada a la API
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        size="icon"
        variant="ghost"
        className="bg-slate-50 rounded-full flex items-center justify-center h-7 w-7"
        onClick={onPlayButton}>
          <Play className="text-zinc-900 h-3 w-3 fill-zinc-900"></Play>
        </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        className={`flex items-center gap-1 ${
          isMyList ? "text-green-500" : "text-white"
        }`}
      >
        <Heart size={16} />
        {isMyList ? "En tu lista" : "Me gusta"}
      </Button>
    </div>
  );
}
