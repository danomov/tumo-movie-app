import { useCallback, useRef, useState } from "react";

// TODO: I think more efficient solution could be to track playing iframe by "message" event listener
// TODO: and stop the iframe by "trailer id" rather than by active index
function useCarouselIframe() {
  const ref = useRef<HTMLIFrameElement[] | []>([]);
  const [activeCarouselItemIdx, setActiveCarouselItemIdx] = useState(0);

  const handleIFrameRefCallback = useCallback((newRef: HTMLIFrameElement | null, index: number) => {
    if (newRef) {
      ref.current[index] = newRef;
    }
  }, []);

  const handleStopActiveIFrame = useCallback(() => {
    const currentActiveIFrame = ref.current[activeCarouselItemIdx];

    // setTimeout to avoid the lag effect
    setTimeout(() => {
      const iFrameSrc = currentActiveIFrame.src;
      currentActiveIFrame.src = iFrameSrc;
    }, 500);
  }, [activeCarouselItemIdx]);

  const handleSwitchActiveCarouselItem = useCallback((command: "prev" | "next") => {
    handleStopActiveIFrame();
    setActiveCarouselItemIdx(activeIndex => activeIndex + (command === "prev" ? -1 : 1));
  }, [handleStopActiveIFrame]);

  return {
    ref,
    activeCarouselItemIdx,
    handleIFrameRefCallback,
    handleSwitchActiveCarouselItem,
  };
}

export default useCarouselIframe;