import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { EScrollRestorationVariants } from "@/types.ts";
import scrollRestorationAPI from "@/services/scroll-restoration-api.ts";
import { getScrollRestorationConfig } from "@/utils/get-scroll-restoration-config.ts";

function ScrollToTop() {
  const { pathname } = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // for scroll restoration
  useEffect(() => {
    const { key, variant } = getScrollRestorationConfig(pathname);

    switch (variant) {
      case EScrollRestorationVariants.Initial:
        window.scrollTo({
          top: scrollRestorationAPI.getRestorationValue(key) || 0,
        });
        break;
      case EScrollRestorationVariants.Top:
        window.scrollTo({
          top: 0,
        });
        break;
    }
  }, [pathname]);

  // for scroll tracking
  useEffect(() => {
    const { key, variant } = getScrollRestorationConfig(pathname);

    const scrollTracker = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        scrollRestorationAPI.setRestorationValue(key, window.scrollY);
      }, 200);
    };

    if (variant === EScrollRestorationVariants.Initial) {
      window.addEventListener("scroll", scrollTracker, { passive: true });
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("scroll", scrollTracker);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;