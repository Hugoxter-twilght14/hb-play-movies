import { BlockAnimesProps } from "./BlockAnimes.types";
import { CarouselAnime } from "./CarouselAnime";

export function BlockAnimes({ title, animes }: BlockAnimesProps) {
  if (!animes || animes.length === 0) return null;

  const limitedAnimes = animes.slice(0, 6);

  const extendedAnimes = [
    ...limitedAnimes,
    {
      id: "ver-mas",
      title: "Ver más",
      thumbnailUrl: "/img/ver-mas-animes.jpg", // Asegúrate de que la imagen exista
      genre: [],
      age: "",
      duration: "",
      isMoreCard: true,
    },
  ];

  return (
    <div className="relative px-[4%] md:pt-20 overflow-auto bg-[#171717]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <CarouselAnime animes={extendedAnimes} />
    </div>
  );
}
