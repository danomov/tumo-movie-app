import { useEffect, useRef } from "react";

interface IUseIntersectionObserver {
  callback: (entries: IntersectionObserverEntry[]) => void,
  root: Document | Element | null,
  rootMargin?: string,
  threshold?: number | number[],
}

const useIntersectionObserver = ({
  callback,
  root,
  rootMargin = "0px",
  threshold = 1.0,
}: IUseIntersectionObserver) => {
  const observerTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entries);
        }
      });
    }, options);

    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [callback, root, rootMargin, threshold]);

  return { observerTargetRef };
};

export default useIntersectionObserver;