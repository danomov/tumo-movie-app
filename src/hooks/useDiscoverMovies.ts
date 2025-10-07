import { useInfiniteQuery } from "@tanstack/react-query";
import getMovies from "@/actions/get-movies.ts";
import type { IFiltersData } from "@/types.ts";

interface IUseDiscoverMoviesProps {
  searchQuery?: string,
  filters?: IFiltersData,
}

function useDiscoverMovies({ searchQuery, filters }: IUseDiscoverMoviesProps) {
  return useInfiniteQuery({
    queryKey: ["movies", searchQuery, filters],
    queryFn: ({ pageParam }) => getMovies({ page: pageParam, searchQuery, genres: filters?.genreIds }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    gcTime: 1000 * 60 * 60 * 24 // 24 hours,
  });
}

export default useDiscoverMovies;