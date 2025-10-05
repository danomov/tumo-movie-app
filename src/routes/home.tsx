import SearchContextProvider from "@/providers/search-context-provider.tsx";
import SearchPanel from "@/components/custom/search-panel.tsx";
import MoviesCollection from "@/components/custom/movies-collection.tsx";

export default function Home() {
  return (
    <div className="mt-10 md:mt-20">
      <SearchContextProvider>
        <SearchPanel />
        <MoviesCollection />
      </SearchContextProvider>
    </div>
  );
}