import Button from "@/components/ui/button.tsx";
import { Heart } from "lucide-react";
import useFavoriteMovies from "@/hooks/useFavoriteMovies.ts";

interface IFavoriteActionProps {
  id: number;
}

function FavoriteAction({ id }: IFavoriteActionProps) {
  const { favoriteMovies, toggleFavoriteMovies } = useFavoriteMovies();

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => toggleFavoriteMovies(id)}
      className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
    >
      <Heart className={`h-5 w-5 ${favoriteMovies.includes(id) ? "fill-red-500 text-red-500" : ""}`}/>
      {favoriteMovies.includes(id) ? "Favorite" : "Add to Favorites"}
    </Button>
  );
}

export default FavoriteAction;