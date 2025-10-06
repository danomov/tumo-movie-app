import type { IMovieCast, IMovieDetails, ISimilarMovie } from "@/types.ts";

interface IGetMovieReturnType {
  movie: IMovieDetails;
  cast: IMovieCast[];
  similar: ISimilarMovie[];
}

async function getMovie(id: string): Promise<IGetMovieReturnType> {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");

  const url2 = new URL(`https://api.themoviedb.org/3/movie/${id}/credits`);
  url2.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");

  const url3 = new URL(`https://api.themoviedb.org/3/movie/${id}/similar`);
  url3.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");

  const response = await Promise.all([
    fetch(url, { cache: "no-store" }),
    fetch(url2, { cache: "no-store" }),
    fetch(url3, { cache: "no-store" }),
  ]);

  if (!response[0].ok || !response[1].ok || !response[2].ok) {
    throw new Error("Failed to fetch movie");
  }

  const movie = await response[0].json();
  const credits = await response[1].json();
  const similar = await response[2].json();

  return {
    movie,
    cast: credits.cast,
    similar: similar.results,
  };
}

export default getMovie;