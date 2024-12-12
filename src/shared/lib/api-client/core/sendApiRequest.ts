import { HttpStatusCode, type HttpStatusMessage } from '#shared/enums/http';
import { to } from '#shared/utils/to.ts';
import { isSuccessResponseBody } from '../types/guard.ts';
import type {
  ApiRequest,
  ApiResponse,
  ResponseBody,
  ResponseMetadata
} from '../types/index.ts';

const originUrl: string = import.meta.env.VITE_API_URL;

export async function sendApiRequest<T>(
  apiRequest: ApiRequest
): Promise<ApiResponse<T>> {
  const url: string = `${originUrl}${apiRequest.endpoint}`;

  const [error, response] = await to<Response>(() =>
    fetch(url, apiRequest.parameters)
  );
  if (error) return [error, undefined, undefined];

  return parseResponse<T>(response);
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const metadata: ResponseMetadata = {
    statusCode: response.status,
    statusMessage: response.statusText as HttpStatusMessage
  };

  if (response.status === HttpStatusCode.NoContent) {
    return [undefined, undefined, metadata];
  }

  const [error, body] = await to<ResponseBody<T>>(() => response.json());
  if (error) return [error, undefined, metadata];

  metadata.debugInfo = body.debugInfo;

  if (isSuccessResponseBody<T>(body)) {
    return [undefined, body.data, metadata];
  }

  return [new Error(body.error.message), undefined, metadata];
}
