import { useState, useEffect, useCallback } from "react";

export function useFetch(url) {
  const [serials, setSerials] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);

  const fetchSerials = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error("помилка запиту");
      }
      const data = await result.json();
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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchSerials();
  }, [fetchSerials]);
  return { serials, isLoading, isError, fetchSerials };
}
