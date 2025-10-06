import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getGenres from "@/actions/get-genres.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import Button from "@/components/ui/button.tsx";
import { Funnel } from "lucide-react";
import FilterItem from "@/components/custom/filter-item.tsx";
import type { IGenre } from "@/types.ts";
import FilterItemSkeleton from "@/components/custom/filter-item-skeleton.tsx";
import { FILTER_SKELETON_ITEMS_COUNT } from "@/constants.ts";
import useFilterContext from "@/hooks/useFilterContext.ts";
import useSearchContext from "@/hooks/useSearchContext.ts";

function Filters() {
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 90, // 90 hours
    gcTime: 1000 * 60 * 60 * 100 // 100 hours,
  });

  const { onSearch } = useSearchContext();
  const { filters, onSubmitFilters } = useFilterContext();

  const handleGenreChange = (checked: string | boolean, targetGenreId: number) => {
    if (checked === "indeterminate") return;

    if (checked) {
      setSelectedGenreIds([...selectedGenreIds, targetGenreId]);
      return;
    }

    const filteredGenres = selectedGenreIds.filter(genreId => genreId !== targetGenreId);
    setSelectedGenreIds(filteredGenres);
  };

  const resetFilters = useCallback(() => {
    setSelectedGenreIds([]);
  }, []);

  const handleApplyFilters = useCallback(() => {
    onSubmitFilters({
      genreIds: selectedGenreIds,
    });
    onSearch("");
  }, [onSearch, onSubmitFilters, selectedGenreIds]);

  useEffect(() => {
    if (!filters.genreIds.length) resetFilters();
  }, [filters, resetFilters]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Funnel /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width]" align="end">
        {data?.genres?.map(({ id, name }: IGenre) => (
          <FilterItem
            key={id}
            id={id}
            name={name}
            onGenreChange={handleGenreChange}
            isActive={selectedGenreIds.includes(id)}
          />
        ))}
        {(isLoading || !data) && new Array(FILTER_SKELETON_ITEMS_COUNT).fill(1).map(() => (
          <FilterItemSkeleton />
        ))}
        <Button variant="outline" size="sm" className="w-full mt-3" onClick={handleApplyFilters}>Apply</Button>
      </PopoverContent>
    </Popover>
  );
}

export default Filters;