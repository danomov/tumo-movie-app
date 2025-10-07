import { type ReactNode, useCallback, useState } from "react";
import FiltersContext from "@/context/filters-context.tsx";
import type { IFiltersData } from "@/types.ts";

function FiltersContextProvider({ children }: { children: ReactNode, }) {
  const [filters, setFilters] = useState<IFiltersData>({
    genreIds: [],
  });

  const handleSubmitFilters = useCallback((newFilters: Partial<IFiltersData>) => {
    setFilters(filters => ({
      ...filters,
      ...newFilters,
    }));
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        onSubmitFilters: handleSubmitFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersContextProvider;