import { type ChangeEvent, useCallback, useState, type KeyboardEvent, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce.ts";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group.tsx";
import { skipToken, useQuery } from "@tanstack/react-query";
import searchMovies from "@/actions/search-movies.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Link } from "react-router";
import { X } from "lucide-react";
import constructMoviePath from "@/utils/construct-movie-path.ts";
import Button from "@/components/ui/button.tsx";
import useSearchContext from "@/hooks/useSearchContext.ts";
import useFilterContext from "@/hooks/useFilterContext.ts";
import SuggestionItem from "@/components/custom/suggestion-item.tsx";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchQuery = useDebounce(searchValue, 1000);

  const { data, isLoading } = useQuery({
    queryKey: ["search-movie", debouncedSearchQuery],
    queryFn: debouncedSearchQuery?.length > 3
      ? () => searchMovies({ query: debouncedSearchQuery, page: 1 })
      : skipToken,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25 // 25 hours,
  });

  const { search, onSearch } = useSearchContext();
  const { onSubmitFilters } = useFilterContext();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    onSearch("");
  }, [onSearch]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
      onSubmitFilters({ genreIds: [] });
    }
  }, [onSearch, onSubmitFilters, searchValue]);

  useEffect(() => {
    if (!search) handleClearSearch();
  }, [search, handleClearSearch]);

  return (
    <div className="relative w-full">
      <InputGroup data-disabled>
        <InputGroupInput
          value={searchValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          placeholder="Find a movie..."
        />
        <InputGroupAddon align="inline-end">
          {isLoading && <Spinner />}
          {searchValue && !isLoading && (
            <Button variant="ghoster" onClick={handleClearSearch}><X /></Button>
          )}
        </InputGroupAddon>
      </InputGroup>
      {data?.results && searchValue && (
        <div className="absolute inset-x-0 top-[calc(100%+1rem)] z-10 bg-popover rounded-md shadow-lg overflow-hidden">
          {data.results.slice(0, 3).map((suggestion) => (
            <Link key={suggestion.id} to={constructMoviePath(suggestion.id)}>
              <SuggestionItem suggestion={suggestion} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;