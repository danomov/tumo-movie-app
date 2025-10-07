import type { IGenre, IMovieDetails } from "@/types.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Star } from "lucide-react";
import { useMemo } from "react";
import formatReleaseDate from "@/utils/format-release-date.ts";
import MovieActions from "@/components/custom/movie-actions.tsx";

interface IMovieInfoProps {
  movie: IMovieDetails,
}

function MovieInfo({ movie }: IMovieInfoProps) {
  const releaseDate = useMemo(() => formatReleaseDate(movie.release_date), [movie.release_date]);

  return (
    <div className="flex-1 text-white">
      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genres.map((genre: IGenre) => (
          <Badge key={genre.name} variant="secondary" className="bg-white/20 text-white">
            {genre.name}
          </Badge>
        ))}
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold mb-2">{movie.title}</h1>
      <p className="text-xl text-gray-300 mb-6">{releaseDate}</p>

      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
        <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}/10</span>
      </div>

      <MovieActions id={movie.id} title={movie.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <p>
            <span className="font-semibold">Studios:</span>
            <span className="ml-1">{movie.production_companies.map(company => company.name).join(", ")}</span>
          </p>
          <p>
            <span className="font-semibold">Rating:</span>
            <span className="ml-1">{movie?.vote_average.toFixed(1)}</span>
          </p>
          <p>
            <span className="font-semibold">Budget:</span>
            <span className="ml-1">{movie.budget}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Box Office:</span>
            <span className="ml-1">{movie.revenue}</span>
          </p>
          <p>
            <span className="font-semibold">Language:</span>
            <span className="ml-1">
              {movie.spoken_languages.map(language => language.english_name).join(", ")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;