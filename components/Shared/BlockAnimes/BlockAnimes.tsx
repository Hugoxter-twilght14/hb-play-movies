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
      thumbnailUrl: "/img/ver-mas-animes.jpg", // ✅ Asegúrate que esta imagen exista en /public/img
      genre: [],
      age: "",
      duration: "",
      isMoreCard: true,
    },
  ];

  return (
    <section className="w-full px-[4%] pt-8 md:pt-20 bg-[#171717]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <div className="w-full overflow-x-auto">
        <CarouselAnime animes={extendedAnimes} />
      </div>
    </section>
  );
}
