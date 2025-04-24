import { BarraBuscador } from "../BarraBuscador";
import { FiltrosCategorias } from "../FiltrosCategorias";
import { ResultadosGrid } from "../ResultadosGrid";
import { ResultadoCard } from "../ResultadoCard/ResultadoCard";
import type { Contenido } from "../Buscador";
import { ButtonRegresar } from "../../ButtonRegresar";

interface Props {
    query: string;
    setQuery: (value: string) => void;
    tipo: "all" | "pelicula" | "serie" | "anime";
    setTipo: (value: "all" | "pelicula" | "serie" | "anime") => void;
    genero: string | null;
    setGenero: (value: string | null) => void;
    contenidoFiltrado: Contenido[];
    children?: React.ReactNode; 
  }
  

export function BuscadorLayout({
  query,
  setQuery,
  tipo,
  setTipo,
  genero,
  setGenero,
  contenidoFiltrado,
}: Props) {
  return (
    <main className="w-full min-h-screen bg-zinc-900 text-white px-6 py-10 flex flex-col md:flex-row gap-6">
      <aside className="md:w-1/3 w-full">
      <ButtonRegresar/>
        <BarraBuscador query={query} setQuery={setQuery} />
        <FiltrosCategorias
          tipo={tipo}
          setTipo={setTipo}
          genero={genero}
          setGenero={setGenero}
        />
      </aside>

      <section className="md:w-2/3 w-full">
        <ResultadosGrid>
          {contenidoFiltrado.map((item) => (
            <ResultadoCard key={item.id} contenido={item} />
          ))}
        </ResultadosGrid>
      </section>
    </main>
  );
}
