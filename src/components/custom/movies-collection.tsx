import { memo, useCallback, useEffect } from "react";
import MovieCard from "@/components/custom/movie-card.tsx";
import type { IMovie } from "@/types.ts";
import MovieCardSkeleton from "@/components/custom/movie-card-skeleton.tsx";
import useIntersectionObserver from "@/hooks/useIntersectionObserver.ts";
import NoMoviesFound from "@/components/custom/no-movies-found.tsx";
import { MOVIE_GRID_SKELETON_ITEMS_COUNT } from "@/constants.ts";
import useSearchContext from "@/hooks/useSearchContext.ts";
import useFilterContext from "@/hooks/useFilterContext.ts";
import useDiscoverMovies from "@/hooks/useDiscoverMovies.ts";
import { useQueryClient } from "@tanstack/react-query";
import getMovie from "@/actions/get-movie.ts";

function MoviesCollection() {
  const { search } = useSearchContext();
  const { filters } = useFilterContext();
  const queryClient = useQueryClient();
  const { data, isFetching, hasNextPage, fetchNextPage } = useDiscoverMovies({ searchQuery: search, filters });

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const { observerTargetRef } = useIntersectionObserver({
    callback: handleLoadMore,
    root: document
  });

  const prefetchMovies = useCallback((async (id: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["movie", id],
      queryFn: () => getMovie(id),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 25 // 25 hours
    });
  }), [queryClient]);

  useEffect(() => {
    const movies = data?.pages[0].movies;

    if (movies?.length) {
      const prefetchMovieIds = movies.slice(0, 3)?.map((movie: IMovie) => movie.id);
      prefetchMovieIds.forEach((id) => prefetchMovies(id));
    }
  }, [data?.pages, prefetchMovies]);

  if (!data?.pages[0].movies?.length && !isFetching) {
    return <NoMoviesFound />;
  }

  return (
    <section className="grid grid-cols-3 gap-x-4 gap-y-6 md:gap-y-10 items-center">
      {data?.pages.map((results) => (
        results.movies?.map((movie: IMovie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ))}
      {isFetching && new Array(MOVIE_GRID_SKELETON_ITEMS_COUNT).fill(1).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
      <div ref={observerTargetRef}></div>
    </section>
  );
}

export default memo(MoviesCollection);