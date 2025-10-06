import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="relative container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <Skeleton className="w-80 h-[480px] mx-auto lg:mx-0 rounded-lg" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-18 rounded-full" />
              </div>

              <Skeleton className="h-12 w-3/4 mb-2" />
              <Skeleton className="h-6 w-20 mb-6" />

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>

              <div className="space-y-2 mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-28" />
                <Skeleton className="h-12 w-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {new Array(6).fill(1).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-3/4 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        <section>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {new Array(6).fill(1).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <div className="p-3">
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieDetailsSkeleton;