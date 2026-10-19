import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch(url) {
  const [serials, setSerials] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchSerials = useCallback(async () => {
    controllerRef.current && controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const signal = controller.signal;

    try {
      setIsLoading(true);
      setError(null);
      const result = await fetch(url, {
        signal: signal,
      });
      if (result.status === 404) {
        throw new Error("Серіал не знайдено");
      }
      if (!result.ok) {
        throw new Error("Не вдалося завантажити дані. Спробуйте ще раз.");
      }
      const data = await result.json();
      if (signal.aborted) {
        return;
      }

      if (Array.isArray(data)) {
        const shows = data.map((item) => {
          if (item.show) {
            return item.show;
          }

          return item;
        });

        setSerials(shows);
      } else {
        setSerials(data);
      }
    } catch (err) {
      if (signal.aborted || err.name === "AbortError") {
        return;
      }
      setError(err.message);
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [url]);
  useEffect(() => {
    fetchSerials();

    return () => {
      controllerRef.current && controllerRef.current.abort();
    };
  }, [fetchSerials]);
  return { serials, isLoading, isError, fetchSerials };
}
