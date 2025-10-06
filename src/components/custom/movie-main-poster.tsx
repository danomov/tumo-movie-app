import type { IMovieDetails } from "@/types.ts";
import constructPosterPath from "@/utils/construct-poster-path.ts";

interface IMovieMainPosterProps {
  title: IMovieDetails["title"];
  posterPath: IMovieDetails["poster_path"];
}

function MovieMainPoster({ title, posterPath }: IMovieMainPosterProps) {
  return (
    <div className="flex-shrink-0">
      <div className="relative w-80 h-[480px] mx-auto lg:mx-0">
        <img
          alt={title}
          className="object-cover rounded-lg shadow-2xl w-full h-full"
          src={constructPosterPath(posterPath)}
        />
      </div>
    </div>
  );
}

export default MovieMainPoster;