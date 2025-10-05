import { createContext } from "react";

const initialState = {
  search: "",
  handleSearch: () => {}
};

interface ISearchContext {
  search: string;
  handleSearch: (value: string) => void;
}

const SearchContext = createContext<ISearchContext>(initialState);

export default SearchContext;