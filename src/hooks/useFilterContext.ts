import { useContext } from "react";
import FiltersContext from "@/context/filters-context.tsx";

function useFilterContext() {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilterContext must be used within a FilterContextProvider");
  }

  return context;
}

export default useFilterContext;