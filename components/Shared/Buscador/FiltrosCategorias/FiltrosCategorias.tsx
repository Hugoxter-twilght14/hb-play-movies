interface Props {
    tipo: "all" | "pelicula" | "serie" | "anime";
    setTipo: (value: "all" | "pelicula" | "serie" | "anime") => void;
    genero: string | null;
    setGenero: (value: string | null) => void;
  }
  
  export function FiltrosCategorias({ tipo, setTipo, genero, setGenero }: Props) {
    const generosDisponibles = [
      "Acción", "Aventura", "Comedia", "Drama",
      "Fantasía", "Terror", "Romance", "Ciencia ficción",
    ];
  
    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold mb-2">Tipo</h4>
          <div className="flex gap-2 flex-wrap">
            {["all", "pelicula", "serie", "anime"].map((t) => (
              <button
                key={t}
                onClick={() => setTipo(t as Props["tipo"])}
                className={`px-3 py-1 rounded-full border ${
                  tipo === t ? "bg-blue-600 text-white" : "bg-zinc-800 text-gray-300"
                }`}
              >
                {t === "all" ? "Todos" : t}
              </button>
            ))}
          </div>
        </div>
  
        <div>
          <h4 className="font-bold mb-2">Género</h4>
          <div className="flex gap-2 flex-wrap">
            {generosDisponibles.map((g) => (
              <button
                key={g}
                onClick={() => setGenero(genero === g ? null : g)}
                className={`px-3 py-1 rounded-full border ${
                  genero === g ? "bg-emerald-500 text-white" : "bg-zinc-800 text-gray-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  