import type { IMovieDetails } from "@/types.ts";

interface IMovieInfoDetailsProps {
  movie: IMovieDetails,
}

function MovieInfoDetails({ movie }: IMovieInfoDetailsProps) {
  return (
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
  );
}

export default MovieInfoDetails;