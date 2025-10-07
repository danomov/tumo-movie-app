import { createContext } from "react";
import type { IFiltersData } from "@/types.ts";

const initialState = {
  filters: {
    genreIds: [],
  },
  onSubmitFilters: () => {}
};

interface IFiltersContext {
  filters: IFiltersData,
  onSubmitFilters: (newFilters: Partial<IFiltersData>) => void,
}

const FiltersContext = createContext<IFiltersContext>(initialState);

export default FiltersContext;