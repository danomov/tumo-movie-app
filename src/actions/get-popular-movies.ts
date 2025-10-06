import type { IFiltersData, IGetPopularMoviesReturnType } from "@/types.ts";

interface IGetPopularMoviesProps {
  page: number;
  genres?: IFiltersData["genreIds"];
}

async function getPopularMovies({ page, genres }: IGetPopularMoviesProps): Promise<IGetPopularMoviesReturnType> {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");
  url.searchParams.set("page", String(page));
  if (genres?.length) url.searchParams.set("with_genres", genres.join(","));

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const movies = await response.json();

  return {
    results: movies.results,
    page: movies.page,
    total_pages: movies.total_pages,
  };
}

export default getPopularMovies;