import {
  HttpMethod,
  HttpStatusCode,
  HttpStatusMessage
} from '#shared/enums/http';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { sendApiRequest } from './sendApiRequest.ts';
import { ApiRequestBuilder } from './ApiRequestBuilder.ts';

const mockFetch: Mock<typeof fetch> = vi.fn();
global.fetch = mockFetch;

describe('sendApiRequest', (): void => {
  beforeEach((): void => {
    mockFetch.mockReset();
  });

  it('should handle server error', async (): Promise<void> => {
    const responseBody = {
      error: {
        name: 'InternalServerError',
        message: 'jwt expired'
      },
      debugInfo: {
        statusCode: HttpStatusCode.InternalServerError
      }
    };
    const responseInit: ResponseInit = {
      status: HttpStatusCode.InternalServerError,
      statusText: HttpStatusMessage.InternalServerError,
      headers: { 'Content-Type': 'application/json' }
    };

    const mockResponse = new Response(
      JSON.stringify(responseBody),
      responseInit
    );

    mockFetch.mockResolvedValueOnce(mockResponse);

    const request = new ApiRequestBuilder()
      .setEndpoint('/exercises')
      .setMethod(HttpMethod.Get)
      .build();

    const [error, result, metadata] = await sendApiRequest(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(error?.message).toStrictEqual(responseBody.error.message);
    expect(metadata?.statusCode).toBe(500);
    expect(metadata?.debugInfo?.statusCode).toBe(500);
    expect(result).toBeUndefined();
  });

  it('should handle fetch error', async (): Promise<void> => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const request = new ApiRequestBuilder()
      .setEndpoint('/')
      .setMethod(HttpMethod.Get)
      .build();

    const [error, result, metadata] = await sendApiRequest(request);

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Network error');
    expect(result).toBeUndefined();
    expect(metadata).toBeUndefined();
  });

  it('should mask sensitive response data', async (): Promise<void> => {
    const requestBody = {
      email: 'test@gamil.com',
      password: 'password'
    };
    const responseBody = {
      data: {
        message: `Verification email sent to '${requestBody.email}'`
      },
      debugInfo: {
        statusCode: HttpStatusCode.Conflict,
        statusMessage: HttpStatusMessage.Conflict,
        errorName: 'UserAlreadyExistsError',
        errorMessage: `User with email ${requestBody.email} already exists`
      }
    };
    const responseInit: ResponseInit = {
      status: HttpStatusCode.Ok,
      statusText: HttpStatusMessage.Ok,
      headers: { 'Content-Type': 'application/json' }
    };

    const mockResponse = new Response(
      JSON.stringify(responseBody),
      responseInit
    );

    mockFetch.mockResolvedValueOnce(mockResponse);

    const request = new ApiRequestBuilder()
      .setEndpoint('/auth/register')
      .setMethod(HttpMethod.Post)
      .setJsonBody(requestBody)
      .build();

    const [error, result, metadata] = await sendApiRequest(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(error).toBeUndefined();
    expect(result).toStrictEqual(responseBody.data);
    expect(metadata?.statusCode).toBe(HttpStatusCode.Ok);
    expect(metadata?.statusMessage).toBe(HttpStatusMessage.Ok);
    expect(metadata?.debugInfo?.statusCode).toBe(HttpStatusCode.Conflict);
    expect(metadata?.debugInfo?.statusMessage).toBe(HttpStatusMessage.Conflict);
  });
});
