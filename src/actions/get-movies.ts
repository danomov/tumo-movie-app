import searchMovies from "@/actions/search-movies.ts";
import type { IGetPopularMoviesReturnType, IMovie, ISearchMoviesReturnType } from "@/types.ts";
import getPopularMovies from "@/actions/get-popular-movies.ts";

interface IMoviesReturnType {
  movies: IMovie[] | null,
  page: number,
  total_pages: number,
}

interface IGetMoviesProps {
  page: number,
  searchQuery?: string,
  genres?: number[],
}

async function getMovies({ page, searchQuery, genres }: IGetMoviesProps): Promise<IMoviesReturnType> {
  let response: IGetPopularMoviesReturnType | ISearchMoviesReturnType;

  if (searchQuery && !genres?.length) {
    response = await searchMovies({ page, query: searchQuery });
  } else {
    response = await getPopularMovies({ page, genres });
  }

  return {
    movies: response.results,
    page: response.page,
    total_pages: response.total_pages,
  };
}

export default getMovies;