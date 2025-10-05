interface IMoviesReturnType {
  movies: [] | null;
  page: number;
  total_pages: number;
}

async function getMovies(page = 1): Promise<IMoviesReturnType> {
  // 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=sci-fi'
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY || "");
  url.searchParams.set("page", String(page));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const movies = await response.json();

  return {
    movies: movies.results,
    page: movies.page,
    total_pages: movies.total_pages,
  };
}

export default getMovies;