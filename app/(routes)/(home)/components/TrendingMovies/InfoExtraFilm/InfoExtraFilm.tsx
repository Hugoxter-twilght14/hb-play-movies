"use client"
import { ActionsButtonsFilm } from "@/components/Shared/ActionsButtonsFilm";
import { InfoExtraFilmProps } from "./InfoExtraFilm.types";
import dynamic from "next/dynamic";
import { ChaptersInfo } from "@/components/Shared/ChaptersInfo";
import { FilmGenres } from "@/components/Shared/FilmGenres";

const ReactPlayer = dynamic(()=> import("react-player"), {ssr:false});

export  function InfoExtraFilm(props: InfoExtraFilmProps) {
    const {movie} = props;

  return (
    <div className="opacity-0 absolute top-0 transition-all duration-300 z-10
        invisible group-hover:visible delay-300 w-full bg-zinc-900 rounded-lg scale-0
        group-hover:scale-100 group-hover:-translate-y-[5vw] group-hover:opacity-100">
            <div className="aspect-video">
                <ReactPlayer 
                    url={movie.trailerVideo}
                    loop={true}
                    width={"100%"}
                    height={"100%"}
                    playing={true}
                    muted={true}
                    controls={false}
                />
            </div>
            <div className="p-4 shadow-lg">
                <ActionsButtonsFilm idFilm={movie.id} title={movie.title}/>
                <ChaptersInfo age={movie.age} duration={movie.duration} title={movie.title}/>
                <FilmGenres genres={movie.genre}/>
            </div>
        </div>
    );
}
