import { Link } from "react-router";
import constructMoviePath from "@/utils/construct-movie-path.ts";
import SuggestionItem from "@/components/custom/suggestion-item.tsx";
import { memo, useEffect, useState } from "react";
import useOutsideClick from "@/hooks/useClickOutside.ts";
import type { IMovie } from "@/types.ts";

interface ISuggestionsProps {
  suggestions?: IMovie[],
  debouncedSearchQuery: string,
}

function Suggestions({ suggestions, debouncedSearchQuery }: ISuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(true);

  const ref = useOutsideClick(() => {
    setShowSuggestions(false);
  });

  useEffect(() => {
    if (debouncedSearchQuery) {
      setShowSuggestions(true);
    }
  }, [debouncedSearchQuery]);

  if (!suggestions?.length || !debouncedSearchQuery || !showSuggestions) return null;

  return (
    <div
      ref={ref}
      role="listbox"
      id="suggestions"
      className="absolute inset-x-0 top-[calc(100%+1rem)] z-10 bg-popover rounded-md shadow-lg overflow-hidden"
    >
      {suggestions.slice(0, 3).map((suggestion) => (
        <Link key={suggestion.id} to={constructMoviePath(suggestion.id)}>
          <SuggestionItem suggestion={suggestion} />
        </Link>
      ))}
    </div>
  );
}

export default memo(Suggestions);