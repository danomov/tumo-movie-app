import type { IGenre } from "@/types.ts";

interface IGenreReturnType {
  genres: IGenre[];
}

async function getGenres(): Promise<IGenreReturnType> {
  const url = new URL("https://api.themoviedb.org/3/genre/movie/list");
  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");
  url.searchParams.set("language", "en");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await response.json();

  return {
    genres: data.genres,
  };
}

export default getGenres;