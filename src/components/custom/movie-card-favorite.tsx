import { Heart } from "lucide-react";
import useFavoriteMovies from "@/hooks/useFavoriteMovies.ts";

interface IMovieCardFavoriteProps {
  id: number,
}

function MovieCardFavorite({ id }: IMovieCardFavoriteProps) {
  const { favoriteMovies } = useFavoriteMovies();

  if (!favoriteMovies.includes(id)) return null;

  return (
    <div className="group absolute top-2.5 left-2.5">
      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
    </div>
  );
}

export default MovieCardFavorite;