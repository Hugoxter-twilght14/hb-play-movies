import { BarraBuscador } from "../BarraBuscador";
import { FiltrosCategorias } from "../FiltrosCategorias";
import { ResultadosGrid } from "../ResultadosGrid";
import { ResultadoCard } from "../ResultadoCard/ResultadoCard";
import { Button } from "@/components/ui/button";
import { ButtonRegresar } from "../../ButtonRegresar";
import type { Contenido } from "../Buscador";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  tipo: "pelicula" | "serie" | "anime" | "all";
  setTipo: (value: "pelicula" | "serie" | "anime" | "all") => void;
  genero: string | null;
  setGenero: (value: string | null) => void;
  anio: string | null;
  setAnio: (value: string | null) => void;
  contenidoFiltrado: Contenido[];
  page: number;
  setPage: (value: number) => void;
  noMore: boolean;
  loading: boolean;
}

export function BuscadorLayout({
  query,
  setQuery,
  tipo,
  setTipo,
  genero,
  setGenero,
  anio,
  setAnio,
  contenidoFiltrado,
  page,
  setPage,
  noMore,
  loading,
}: Props) {
  const mostrarResultados = contenidoFiltrado.length > 0;

  return (
    <main className="w-full min-h-screen bg-zinc-900 text-white px-4 py-6 md:px-10 md:py-10 flex flex-col md:flex-row gap-6">
      {/* Filtros - izquierda en PC, arriba en móviles */}
      <aside className="w-full md:w-1/3 space-y-6">
        <ButtonRegresar />
        <BarraBuscador query={query} setQuery={setQuery} />
        <FiltrosCategorias
          tipo={tipo}
          setTipo={setTipo}
          genero={genero}
          setGenero={setGenero}
          anio={anio}
          setAnio={setAnio}
        />
      </aside>

      {/* Resultados */}
      <section className="w-full md:w-2/3 space-y-6">
        {!mostrarResultados && (tipo === "all" && !query && !genero && !anio) && (
          <p className="text-center text-gray-400 mt-6 text-sm md:text-base">
            Filtra por tipo, género, año o escribe algo para ver resultados.
          </p>
        )}

        {mostrarResultados && (
          <>
            <ResultadosGrid>
              {contenidoFiltrado.map((item) => (
                <ResultadoCard key={item.id} contenido={item} />
              ))}
            </ResultadosGrid>

            {!noMore && (
              <div className="text-center">
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                  className="px-6 py-2 bg-white text-black font-semibold hover:bg-cyan-500 hover:text-white transition-all rounded"
                >
                  {loading ? "Cargando..." : "Ver más"}
                </Button>
              </div>
            )}

            {noMore && (
              <p className="text-center text-gray-500 text-sm">No hay más resultados</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
