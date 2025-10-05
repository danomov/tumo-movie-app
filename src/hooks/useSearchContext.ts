import { useContext } from "react";
import SearchContext from "@/context/search-context.tsx";

function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext must be used within a SearchContextProvider");
  }

  return context;
}

export default useSearchContext;