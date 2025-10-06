import { useEffect, useRef } from "react";

function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains((event as CustomEvent).target as Node)) {
        callback();
      }
    };

    window.addEventListener("mouseup", handleClickOutside);
    window.addEventListener("touchend", handleClickOutside);

    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
      window.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;