import { type ReactNode, useCallback, useState } from "react";
import SearchContext from "@/context/search-context";

function SearchContextProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        search,
        onSearch: handleSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;