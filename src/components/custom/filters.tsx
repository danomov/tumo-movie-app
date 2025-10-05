import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getGenres from "@/actions/get-genres.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import Button from "@/components/ui/button.tsx";
import { Funnel } from "lucide-react";
import FilterItem from "@/components/custom/filter-item.tsx";
import type { IGenre } from "@/types.ts";
import FilterItemSkeleton from "@/components/custom/filter-item-skeleton.tsx";
import { FILTER_SKELETON_ITEMS_COUNT } from "@/constants.ts";

function Filters() {
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    refetchOnWindowFocus: false,
  });

  const handleGenreChange = (checked: string | boolean, targetGenreId: number) => {
    if (checked === "indeterminate") return;

    if (checked) {
      setSelectedGenreIds([...selectedGenreIds, targetGenreId]);
      return;
    }

    const filteredGenres = selectedGenreIds.filter(genreId => genreId !== targetGenreId);
    setSelectedGenreIds(filteredGenres);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Funnel /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width]" align="end">
        {data?.genres?.map(({ id, name }: IGenre) => (
          <FilterItem name={name} id={id} isActive={selectedGenreIds.includes(id)} onGenreChange={handleGenreChange} />
        ))}
        {(isLoading || !data) && new Array(FILTER_SKELETON_ITEMS_COUNT).fill(1).map(() => (
          <FilterItemSkeleton />
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default Filters;