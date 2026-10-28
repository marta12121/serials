import {useState, useEffect} from 'react';

export function useDebounce (value, delay) {
  const [debonucedValue, setDebonucedValue] = useState (value);
  useEffect (
    () => {
      const timer = setTimeout (() => {
        setDebonucedValue (value);
      }, delay);
      return () => {
        clearTimeout (timer);
      };
    },
    [value, delay]
  );
  return debonucedValue;
}
