import type { IMovieDetails } from "@/types.ts";
import FavoriteAction from "@/components/custom/favorite-action.tsx";
import TrailerAction from "@/components/custom/trailer-action.tsx";

interface IMovieActionsProps {
  id: IMovieDetails["id"];
  title: IMovieDetails["title"];
}

function MovieActions({ id, title }: IMovieActionsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <TrailerAction id={id} title={title} />
      <FavoriteAction id={id} />
    </div>
  );
}

export default MovieActions;