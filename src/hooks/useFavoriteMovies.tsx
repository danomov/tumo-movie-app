import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FAVORITE_MOVIES_KEY } from "@/constants.ts";

type TFavoriteMovies = number[];

const initialFavoriteMovies: TFavoriteMovies = JSON.parse(localStorage.getItem(FAVORITE_MOVIES_KEY) || "[]");

function useFavoriteMovies() {
  const [favorites, setFavorites] = useState<TFavoriteMovies>(initialFavoriteMovies);

  const getFavoriteMovies = useCallback(() => {
    const favoriteMovies = localStorage.getItem(FAVORITE_MOVIES_KEY);
    return favoriteMovies ? JSON.parse(favoriteMovies) : null;
  }, []);

  const getIsFavorite = useCallback((id: number) => {
    const favoriteMovies = JSON.parse(localStorage.getItem(FAVORITE_MOVIES_KEY) || "[]");
    return favoriteMovies.includes(id);
  }, []);

  const toggleFavoriteMovies = useCallback((id: number) => {
    try {
      const favoriteMovies = JSON.parse(localStorage.getItem(FAVORITE_MOVIES_KEY) || "[]");

      localStorage.setItem(
        FAVORITE_MOVIES_KEY,
        favoriteMovies.includes(id)
          ? JSON.stringify(favoriteMovies.filter((movieId: number) => movieId !== id))
          : JSON.stringify([...(favoriteMovies || []), id])
      );

      dispatchEvent(new Event("storage"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "QuotaExceededError") toast.error("You have reached the maximum number of favorites.");
        else toast.error("Failed to save favorite movies.");
      }

      // TODO: As a follow-up action, we can ask for permission to clear the storage.
    }
  }, []);

  useEffect(() => {
    const storageSubscriber = () => {
      const movies = getFavoriteMovies();
      setFavorites(movies);
    };

    window.addEventListener("storage", storageSubscriber);
    return () => window.removeEventListener("storage", storageSubscriber);
  }, [getFavoriteMovies]);

  return {
    favoriteMovies: favorites,
    getIsFavorite,
    getFavoriteMovies,
    toggleFavoriteMovies,
  };
}

export default useFavoriteMovies;