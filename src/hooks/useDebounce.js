import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debonusedValue, setDebonusedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebonusedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debonusedValue;
}
