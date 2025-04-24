import { BlockSeriesProps } from "./BlockSeries.types";
import { CarouselSerie } from "./CarouselSerie";

export function BlockSeries({ title, series }: BlockSeriesProps) {
  if (!series || series.length === 0) return null;

  const limitedSeries = series.slice(0, 6);

  const extendedSeries = [
    ...limitedSeries,
    {
      id: "ver-mas",
      title: "Ver más",
      thumbnailUrl: "/img/ver-mas-series.jpg", // ✅ Verifica que esta imagen exista en /public/img
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
        <CarouselSerie series={extendedSeries} />
      </div>
    </section>
  );
}
