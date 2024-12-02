import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUrlStorage<T extends Record<string, string>>(
  params: T,
  setParams: (params: T) => void
): void {
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect((): void => {
    const paramsFromUrl = Object.fromEntries(queryParams) as T;
    setParams(paramsFromUrl);
  }, [queryParams, setParams]);

  useEffect((): void => {
    const newQueryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        newQueryParams.set(key, value);
      }
    }

    setQueryParams(newQueryParams);
  }, [params, setQueryParams]);
}
