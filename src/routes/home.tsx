import SearchContextProvider from "@/providers/search-context-provider.tsx";
import SearchPanel from "@/components/custom/search-panel.tsx";
import MoviesCollection from "@/components/custom/movies-collection.tsx";
import FiltersContextProvider from "@/providers/filters-context-provider.tsx";

export default function Home() {
  return (
    <div className="mt-10 md:mt-20">
      <FiltersContextProvider>
        <SearchContextProvider>
          <SearchPanel />
          <MoviesCollection />
        </SearchContextProvider>
      </FiltersContextProvider>
    </div>
  );
}