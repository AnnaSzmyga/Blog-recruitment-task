import { useCallback, useEffect, useState } from "react";

export interface FetchState<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
}

export const useFetch = <T>(url: string): FetchState<T> => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    loading: true,
    error: false,
    data: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setFetchState({
          loading: false,
          error: false,
          data,
        });
      } else {
        setFetchState({
          loading: false,
          error: true,
          data: null,
        });
        throw new Error("Error fetching data");
      }
    } catch (error) {
      setFetchState({
        loading: false,
        error: true,
        data: null,
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchState;
};
