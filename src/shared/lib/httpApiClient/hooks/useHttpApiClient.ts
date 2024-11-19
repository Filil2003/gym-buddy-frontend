import { useEffect, useRef } from 'react';
import type { HttpMethod } from '#shared/enums/http';
import { deepMerge } from '#shared/utils/deepMerge';
import { HttpApiClient } from '../core/httpApiClient';
import type {
  HttpApiResponse,
  RequestInitialParameters,
  RequestParameters
} from '../types';
import { AbortControllerManager } from '../utils.ts';

type Parameters = Omit<RequestParameters, 'signal'>;

export function useHttpApiClient<T = unknown>(
  method: HttpMethod,
  endpoint: string,
  initialParameters: Parameters = {}
): ((parameters?: Parameters) => Promise<HttpApiResponse<T>>) {
  const abortController: AbortControllerManager = useRef(new AbortControllerManager()).current;

  useEffect(() => {
    return (): void => abortController.abortSignal();
  }, []);

  return (parameters: Parameters = {}): Promise<HttpApiResponse<T>> => {
    const requestParameters: RequestInitialParameters = deepMerge(initialParameters, {
      ...parameters,
      signal: abortController.createSignal()
    });

    return HttpApiClient.getInstance().sendRequest<T>(method, endpoint, requestParameters);
  };
}
