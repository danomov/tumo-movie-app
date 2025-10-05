import { Link, useParams } from "react-router";
import getMovie from "@/actions/get-movie";
import Button from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { skipToken, useQuery } from "@tanstack/react-query";
import MovieDetailsSkeleton from "@/components/custom/movie-details-skeleton.tsx";
import SimilarMovies from "@/components/custom/similar-movies.tsx";
import MovieCast from "@/components/custom/movie-cast.tsx";
import MovieInfo from "@/components/custom/movie-info.tsx";
import MovieBgPoster from "@/components/custom/movie-bg-poster.tsx";
import MovieMainPoster from "@/components/custom/movie-main-poster.tsx";

function Movie() {
  const { id: movieId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: movieId
      ? () => getMovie(movieId)
      : skipToken,
    refetchOnWindowFocus: false,
  });

  const { movie, cast, similar } = data || {};

  // TODO: better to divide sections and fetch data separately without dependencies from each other
  if (!movie || !cast || !similar || isLoading) return <MovieDetailsSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <MovieBgPoster title={movie.title} backdropPath={movie.backdrop_path} />

        <div className="relative container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              Back to Collection
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <MovieMainPoster title={movie.title} posterPath={movie.poster_path} />
            <MovieInfo movie={movie} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <MovieCast cast={cast} />
        <Separator className="my-12"/>
        <SimilarMovies similar={similar} />
      </div>
    </div>
  );
}

export default Movie;