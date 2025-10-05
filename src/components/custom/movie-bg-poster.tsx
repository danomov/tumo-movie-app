import type { IMovieDetails } from "@/types.ts";

interface IMovieBgPosterProps {
  title: IMovieDetails["title"];
  backdropPath: IMovieDetails["backdrop_path"];
}

function MovieBgPoster({ title, backdropPath }: IMovieBgPosterProps) {
  return (
    <div className="absolute inset-0">
      <img
        alt={title}
        className="object-cover w-full h-full"
        src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
      />
      <div className="absolute inset-0 bg-black/60"/>
    </div>
  );
}

export default MovieBgPoster;