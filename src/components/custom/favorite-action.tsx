import Button from "@/components/ui/button.tsx";
import { Heart } from "lucide-react";
import useFavoriteMovies from "@/hooks/useFavoriteMovies.ts";

interface IFavoriteActionProps {
  id: number,
}

function FavoriteAction({ id }: IFavoriteActionProps) {
  const { favoriteMovies, toggleFavoriteMovies } = useFavoriteMovies();

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => toggleFavoriteMovies(id)}
      data-is-active={favoriteMovies.includes(id)}
      className="group gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
    >
      <Heart className="h-5 w-5 transition-colors duration-300 ease-in-out group-data-[is-active=true]:fill-red-500 group-data-[is-active=true]:text-red-500 group-data-[is-active=false]:group-hover:animate-pulse" />
      {favoriteMovies.includes(id) ? "Favorite" : "Add to Favorites"}
    </Button>
  );
}

export default FavoriteAction;