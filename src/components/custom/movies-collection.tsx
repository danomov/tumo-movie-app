import { memo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import getMovies from "@/actions/get-movies.ts";
import MovieCard from "@/components/custom/movie-card.tsx";
import type { IMovie } from "@/types.ts";
import MovieCardSkeleton from "@/components/custom/movie-card-skeleton.tsx";
import useIntersectionObserver from "@/hooks/useIntersectionObserver.ts";
import NoMoviesFound from "@/components/custom/no-movies-found.tsx";
import { MOVIE_GRID_SKELETON_ITEMS_COUNT } from "@/constants.ts";

function MoviesCollection() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const { observerTargetRef } = useIntersectionObserver({
    callback: handleLoadMore,
    root: document
  });

  if (!data && !isFetching) {
    return <NoMoviesFound />;
  }

  return (
    <section className="grid grid-cols-3 gap-x-4 gap-y-4 items-center">
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