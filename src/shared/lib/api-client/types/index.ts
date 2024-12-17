import type {
  HttpMethod,
  HttpStatusCode,
  HttpStatusMessage
} from '#shared/enums/http';

// ================== Response Types ==================

export type ApiResponse<T> = [
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

// ================== Response Body Types ==================

export type ResponseBody<T> = SuccessResponseBody<T> | ErrorResponseBody;

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

// ================== Request Types ==================

export interface ApiRequest {
  endpoint: string;
  parameters: RequestParameters;
  control: RequestControl;
}

export interface RequestParameters extends RequestInit {
  method: HttpMethod;
}

export interface RequestControl {
  abortController?: AbortController;
}
