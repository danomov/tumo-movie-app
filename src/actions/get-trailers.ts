import type { ITrailers } from "@/types.ts";

interface ITrailersReturnType {
  trailers: ITrailers[],
}

async function getTrailers(movieId: number): Promise<ITrailersReturnType> {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");
  url.searchParams.set("language", "en");

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch trailers");
  }

  const data = await response.json();

  return {
    trailers: data.results.slice(0, 3),
  };
}

export default getTrailers;