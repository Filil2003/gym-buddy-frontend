import type { ResponseBody, SuccessResponseBody } from './index.ts';

export function isSuccessResponseBody<T>(
  body: ResponseBody<T>
): body is SuccessResponseBody<T> {
  return Reflect.has(body, 'data');
}
