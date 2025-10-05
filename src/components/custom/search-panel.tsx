import SearchBar from "@/components/custom/search-bar.tsx";
import Filters from "@/components/custom/filters.tsx";
import { memo } from "react";

function SearchPanel() {
  return (
    <div className="flex gap-2 w-full mb-6">
      <SearchBar />
      <Filters />
    </div>
  );
}

export default memo(SearchPanel);