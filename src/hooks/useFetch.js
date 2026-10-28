
import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch(url) {
  const [serials, setSerials] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const controllerRef = useRef(null);

  const fetchSerials = useCallback(async () => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    const signal = controller.signal;

    try {
      setIsLoading(true);
      setError(null);
      setErrorType(null);

      const result = await fetch(url, { signal });

      if (result.status === 404) {
        setError("Серіал не знайдено");
        setErrorType("not-found");
        return;
      }

      if (!result.ok) {
        throw new Error(
          "Не вдалося завантажити дані. Спробуйте ще раз."
        );
      }

      const data = await result.json();

      if (signal.aborted) {
        return;
      }

      if (Array.isArray(data)) {
        const shows = data.map((item) => item.show ?? item);
        setSerials(shows);
      } else {
        setSerials(data);
      }
    } catch (err) {
      if (signal.aborted || err.name === "AbortError") {
        return;
      }

      if (!navigator.onLine) {
        setError(
          "Немає підключення до інтернету. Перевірте з'єднання та спробуйте ще раз."
        );
        setErrorType("offline");
      } else {
        setError(err.message || "Сталася помилка. Спробуйте ще раз.");
        setErrorType("request-error");
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    fetchSerials();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchSerials]);

  return { serials, isLoading, isError, errorType, fetchSerials };
}
