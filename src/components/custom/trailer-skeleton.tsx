import { Skeleton } from "@/components/ui/skeleton.tsx";

function TrailerSkeleton() {
  return (
    <div className="relative aspect-[6/3]">
      <Skeleton className="absolute inset-0" />
    </div>
  );
}

export default TrailerSkeleton;