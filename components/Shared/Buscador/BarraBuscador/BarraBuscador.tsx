interface Props {
    query: string;
    setQuery: (value: string) => void;
  }
  
  export function BarraBuscador({ query, setQuery }: Props) {
    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
        />
      </div>
    );
  }
  