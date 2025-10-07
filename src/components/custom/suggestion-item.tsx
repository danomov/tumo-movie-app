import constructPosterPath from "@/utils/construct-poster-path.ts";
import formatReleaseDate from "@/utils/format-release-date.ts";
import { Star } from "lucide-react";
import type { IMovie } from "@/types.ts";

interface ISuggestionItemProps {
  suggestion: IMovie,
}

function SuggestionItem({ suggestion }: ISuggestionItemProps) {
  return (
    <div className="flex w-full gap-3 p-2 hover:bg-accent overflow-hidden">
      <img
        alt={`${suggestion.title} poster`}
        src={constructPosterPath(suggestion.poster_path)}
        className="w-[64px] h-[86px] shrink-0 rounded object-cover"
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="truncate font-medium">{suggestion.title}</p>
          <p className="shrink-0 text-xs text-muted-foreground">
            ({suggestion.release_date ? formatReleaseDate(suggestion.release_date) : ""})
          </p>
        </div>
        <p className="text-sm line-clamp-2">{suggestion.overview}</p>
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-yellow-500 text-yellow-500" />
          <p>{suggestion.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;