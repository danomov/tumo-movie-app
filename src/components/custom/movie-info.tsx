import { useMemo } from "react";
import type { IGenre, IMovieDetails } from "@/types.ts";
import { Star } from "lucide-react";
import formatReleaseDate from "@/utils/format-release-date.ts";
import MovieActions from "@/components/custom/movie-actions.tsx";
import TagPills from "@/components/custom/tag-pills.tsx";
import MovieInfoDetails from "@/components/custom/movie-info-details.tsx";

interface IMovieInfoProps {
  movie: IMovieDetails,
}

function MovieInfo({ movie }: IMovieInfoProps) {
  const releaseDate = useMemo(() =>
    movie.release_date
      ? formatReleaseDate(movie.release_date)
      : "Release Date: Not Specified", [movie.release_date]
  );

  return (
    <div className="flex-1 text-white">
      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genres.map((genre: IGenre) => (
          <TagPills key={genre.name} title={genre.name} />
        ))}
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold mb-2">{movie.title}</h1>
      <p className="text-xl text-gray-300 mb-6">{releaseDate}</p>

      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
        <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}/10</span>
      </div>

      <MovieActions id={movie.id} title={movie.title} />
      <MovieInfoDetails movie={movie} />
    </div>
  );
}

export default MovieInfo;