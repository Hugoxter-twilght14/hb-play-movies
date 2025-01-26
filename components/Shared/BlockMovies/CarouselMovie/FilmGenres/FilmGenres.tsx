import { FilmGenresProps } from "./FilmGenres.types";

export function FilmGenres(proprs: FilmGenresProps) {
    const {genres} = proprs;

    if(genres.length === 0) {
        return null;
    }

  return (
    <div className="flex gap-4 text-[10px] text-white">
      {genres.map((genre) => (
        <p key={genre}>{genre}</p>
      ))}
    </div>
  )
}
