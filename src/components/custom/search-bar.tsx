import { Input } from "@/components/ui/input.tsx";
import useSearchContext from "@/hooks/useSearchContext.ts";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import useThrottle from "@/hooks/useThrottle.ts";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const throttledSearch = useThrottle(searchValue, 500);

  const { handleSearch } = useSearchContext();

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  useEffect(() => {
    if (!throttledSearch) return;

    handleSearch(throttledSearch);
  }, [throttledSearch]);

  return (
    <Input type="text" placeholder="Search for movies..." value={searchValue} onChange={handleInputChange} />
  );
}

export default SearchBar;