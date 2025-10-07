import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
import ResponsiveIframe from "@/components/custom/responsive-iframe.tsx";
import constructYoutubeUrl from "@/utils/construct-youtube-url.ts";
import { skipToken, useQuery } from "@tanstack/react-query";
import getTrailers from "@/actions/get-trailers.ts";
import TrailerSkeleton from "@/components/custom/trailer-skeleton.tsx";
import useCarouselIframe from "@/hooks/useCarouselIframe.tsx";

interface ITrailerDialogProps {
  title: string,
  movieId: number,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

function TrailerDialog({ title, movieId, open, onOpenChange }: ITrailerDialogProps) {
  const { handleIFrameRefCallback, handleSwitchActiveCarouselItem } = useCarouselIframe();

  const { data, isLoading } = useQuery({
    queryKey: ["trailers", movieId],
    queryFn: movieId
      ? () => getTrailers(movieId)
      : skipToken,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25 // 25 hours,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full px-16">
        <DialogHeader>
          <DialogTitle className="hidden">{title}</DialogTitle>
        </DialogHeader>
        <Carousel>
          <CarouselContent>
            {data?.trailers.map((trailer, index) => (
              <CarouselItem key={trailer.id}>
                <ResponsiveIframe
                  sourceUrl={constructYoutubeUrl(trailer.key)}
                  onSetIFrameRef={(ref: HTMLIFrameElement | null) => handleIFrameRefCallback(ref, index)}
                />
              </CarouselItem>
            ))}
            {!data || isLoading && (
              <CarouselItem>
                <TrailerSkeleton />
              </CarouselItem>
            )}
          </CarouselContent>

          <CarouselPrevious onScrollPrevCallback={() => handleSwitchActiveCarouselItem("prev")} />
          <CarouselNext onScrollNextCallback={() => handleSwitchActiveCarouselItem("next")} />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}

export default TrailerDialog;