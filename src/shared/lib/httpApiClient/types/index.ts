import type { HttpStatusCode, HttpStatusMessage } from '#shared/enums/http';

export type HttpApiResponse<T> = [
    Error | undefined,
    T | undefined,
    ResponseMetadata | undefined
];

export interface ResponseMetadata {
  statusCode: HttpStatusCode;
  statusMessage: HttpStatusMessage;
  debugInfo?: DebugInfo;
}

export interface DebugInfo {
  statusCode: HttpStatusCode;
  statusMessage: HttpStatusMessage;
  errorName: string;
  errorMessage: string;
  stack?: string;
}

export interface SuccessResponseBody<T> {
  data: T;
  debugInfo?: DebugInfo;
}

interface ErrorResponseBody {
  error: {
    name: string;
    message: string;
  };
  debugInfo?: DebugInfo;
}

export type ResponseBody<T> = SuccessResponseBody<T> | ErrorResponseBody;

export type RequestInitialParameters = RequestInit;
export type RequestParameters = Omit<RequestInitialParameters, 'method'>;
