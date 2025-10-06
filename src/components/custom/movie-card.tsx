import { useMemo } from "react";
import { Link } from "react-router";
import type { IMovie } from "@/types";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import formatReleaseDate from "@/utils/format-release-date.ts";
import constructMoviePath from "@/utils/construct-movie-path.ts";
import MovieCardFavorite from "@/components/custom/movie-card-favorite.tsx";
import constructPosterPath from "@/utils/construct-poster-path.ts";

interface IMovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  const releaseDate = useMemo(() => formatReleaseDate(movie.release_date), [movie.release_date]);

  return (
    <Card
      key={movie.id}
      className="group cursor-pointer overflow-hidden transition-all md:hover:scale-105 hover:shadow-lg p-0 h-full"
    >
      <CardContent className="p-0">
        <Link to={constructMoviePath(movie.id)}>
          <div className="relative aspect-[3/4]">
            <img
              alt={movie.title}
              src={constructPosterPath(movie.poster_path)}
              className="object-cover transition-all group-hover:brightness-75"
            />
            <MovieCardFavorite id={movie.id} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute top-0 right-0 p-3 text-white">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-semibold line-clamp-2" title={movie.title}>
              {movie.title}
            </h3>
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <span>{releaseDate}</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MovieCard;