import { createContext } from "react";

const initialState = {
  search: "",
  onSearch: () => {}
};

interface ISearchContext {
  search: string,
  onSearch: (value: string) => void,
}

const SearchContext = createContext<ISearchContext>(initialState);

export default SearchContext;