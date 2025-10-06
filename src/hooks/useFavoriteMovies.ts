import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import favoriteMoviesApi from "@/services/favorite-movies-api.ts";
import type { TFavoriteMovies } from "@/types.ts";

function useFavoriteMovies() {
  const [favorites, setFavorites] = useState<TFavoriteMovies>(favoriteMoviesApi.getMovies() || []);

  const errorCallback = useCallback((error: Error) => {
    if (error.name === "QuotaExceededError") toast.error("You have reached the maximum number of favorites.");
    else toast.error("Failed to save favorite movies.");
  }, []);

  const toggleFavoriteMovies = useCallback((id: number) => {
    favoriteMoviesApi.toggleFavoriteMovie(id, errorCallback);
  }, [errorCallback]);

  useEffect(() => {
    const storageSubscriber = () => {
      const movies = favoriteMoviesApi.getMovies();
      setFavorites(movies);
    };

    const unsubscribe = favoriteMoviesApi.subscribe(storageSubscriber);
    return unsubscribe;
  }, []);

  return {
    favoriteMovies: favorites,
    getIsFavorite: (id: number) => favoriteMoviesApi.getIsFavorite(id),
    getFavoriteMovies: () => favoriteMoviesApi.getMovies(),
    toggleFavoriteMovies,
  };
}

export default useFavoriteMovies;