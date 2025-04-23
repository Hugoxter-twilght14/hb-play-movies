import { BlockSeriesProps } from "./BlockSeries.types";
import { CarouselSerie } from "./CarouselSerie";

export function BlockSeries({ title, series }: BlockSeriesProps) {
  if (!series || series.length === 0) return null;

  // Limitar a 6 y agregar tarjeta especial "Ver más"
  const limitedSeries = series.slice(0, 6);
  const extendedSeries = [
    ...limitedSeries,
    {
      id: "ver-mas",
      title: "Ver más",
      thumbnailUrl: "/img/ver-mas-series.jpg", // Asegúrate que esta imagen exista
      genre: [],
      age: "",
      duration: "",
      isMoreCard: true,
    },
  ];

  return (
    <div className="-top-16 relative px-[4%] md:pt-20 md:pd-20 overflow-auto bg-[#171717]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <CarouselSerie series={extendedSeries} />
    </div>
  );
}
