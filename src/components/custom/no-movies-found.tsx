import { Film } from "lucide-react";
import useSearchContext from "@/hooks/useSearchContext.ts";
import useFilterContext from "@/hooks/useFilterContext.ts";

function NoMoviesFound() {
  const { search } = useSearchContext();
  const { filters } = useFilterContext();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <div className="relative bg-card border-2 border-border rounded-full p-8">
          <Film className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-balance">No movies found</h3>
      <p className="text-muted-foreground text-pretty max-w-md leading-relaxed mb-6">
        {search && filters.genreIds.length
          ? "No movies match your search and selected genres."
          : search
            ? `No movies match "${search}". Try a different search term.`
            : filters.genreIds.length
              ? "No movies match the selected genres. Try different filters."
              : "Start by searching or selecting genres to discover movies."
        }
      </p>
    </div>
  );
}

export default NoMoviesFound;