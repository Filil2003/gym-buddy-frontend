import { useCallback, useEffect, useRef, useState } from 'react';
import { sendApiRequest } from '../core/sendApiRequest.ts';
import type { ApiRequest, ApiResponse } from '../types/index.ts';

export function useApiClient() {
  const abortControllerRef = useRef<AbortController>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    return (): void => abortControllerRef.current?.abort();
  }, []);

  const sendRequest = useCallback(
    async <T>(request: ApiRequest): Promise<ApiResponse<T>> => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = request.control.abortController;

      setIsFetching(true);
      const [error, body, metadata] = await sendApiRequest<T>(request);
      setIsFetching(false);

      if (error) return [error, undefined, metadata];

      return [undefined, body, metadata];
    },
    []
  );

  return [sendRequest, isFetching] as const;
}
