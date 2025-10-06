import type { ISearchMoviesReturnType } from "@/types.ts";

interface ISearchMoviesProps {
  page: number;
  query: string;
}

async function searchMovies({ page, query }: ISearchMoviesProps): Promise<ISearchMoviesReturnType> {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");
  url.searchParams.set("query", query);
  url.searchParams.set("language", "en");
  url.searchParams.set("page", String(page));

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();

  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
  };
}

export default searchMovies;