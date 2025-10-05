import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4]">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="p-3">
          <Skeleton className="h-4 w-3/4" />
          <div className="mt-2 flex items-center justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieCardSkeleton;