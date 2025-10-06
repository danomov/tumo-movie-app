import type { TFavoriteMovies } from "@/types.ts";
import { FAVORITE_MOVIES_KEY } from "@/constants.ts";

type Subscriber<T> = (value: T | []) => void;

export class FavoriteMoviesApi<T = TFavoriteMovies> {
  private key: typeof FAVORITE_MOVIES_KEY;
  private subscribers: Set<Subscriber<T>>;
  private eventListenerCb: ((event: StorageEvent) => void) | null;
  private notifySubscribers(value: T | []) {
    this.subscribers.forEach((subscriber) => subscriber(value));
  }

  constructor() {
    this.key = FAVORITE_MOVIES_KEY;
    this.subscribers = new Set();
    this.eventListenerCb = null;

    this.createEventListener();
  }

  createEventListener() {
    if (this.eventListenerCb) return;

    this.eventListenerCb = (event) => {
      if (event.key === this.key) {
        this.notifySubscribers(this.getMovies());
      }
    };

    window.addEventListener("storage", this.eventListenerCb);
  }

  getMovies(): T | [] {
    const favoriteMovies = localStorage.getItem(this.key);
    return favoriteMovies ? (JSON.parse(favoriteMovies) as T) : [];
  }

  getIsFavorite(id: number): boolean {
    const favoriteMovies = JSON.parse(localStorage.getItem(this.key) || "[]");
    return favoriteMovies.includes(id);
  }

  toggleFavoriteMovie(id: number, errorCb: (error: Error) => void): void {
    try {
      const favoriteMovies = JSON.parse(localStorage.getItem(this.key) || "[]");

      localStorage.setItem(
        this.key,
        favoriteMovies.includes(id)
          ? JSON.stringify(favoriteMovies.filter((movieId: number) => movieId !== id))
          : JSON.stringify([...(favoriteMovies || []), id])
      );

      this.notifySubscribers(this.getMovies());
    } catch (error) {
      if (error instanceof Error) {
        errorCb(error);
        return;
      }

      console.error(error);

      // TODO: As a follow-up action, we can ask for permission to clear the storage.
    }
  }

  clearEventListener() {
    if (this.eventListenerCb) {
      window.removeEventListener("storage", this.eventListenerCb);
      this.eventListenerCb = null;
    }
  }

  subscribe(subscriber: Subscriber<T>) {
    // this is done to always have a listener (bc for strict mode constructor is called only once)
    this.createEventListener();

    this.subscribers.add(subscriber);

    return () => {
      this.subscribers.delete(subscriber);

      if (this.subscribers.size === 0) {
        this.clearEventListener();
      }
    };
  }
}

const favoriteMoviesApi = new FavoriteMoviesApi();

export default favoriteMoviesApi;