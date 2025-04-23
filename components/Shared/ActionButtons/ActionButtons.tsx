import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface Props {
  filmId: string;
  title?: string;
  type: "movie" | "anime" | "serie";
  isMyList?: boolean;
}

export function ActionsButtons({ filmId, title, type, isMyList = false }: Props) {
  const handleClick = () => {
    console.log(`✅ Me gusta: ${type.toUpperCase()} – ${title} (ID: ${filmId})`);
    // Aquí podrías manejar el almacenamiento local o llamada a la API
  };

  return (
    <div className="flex items-center gap-2 mt-2">
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
