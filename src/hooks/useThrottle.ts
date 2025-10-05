import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    if (Boolean(value) && Date.now() - lastExecuted.current >= delay) {
      setThrottledValue(value);
      lastExecuted.current = Date.now();
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;