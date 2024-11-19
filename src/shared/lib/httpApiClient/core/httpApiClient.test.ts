import {
  HttpMethod,
  HttpStatusCode,
  HttpStatusMessage
} from '#shared/enums/http';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { HttpApiClient } from './httpApiClient.ts';

const mockFetch: Mock<typeof fetch> = vi.fn();
global.fetch = mockFetch;

describe('HttpApiClient', (): void => {
  const baseUrl = 'https://api.example.com' as const;
  const apiClient: HttpApiClient = HttpApiClient.getInstance(baseUrl, {
    headers: { Authorization: 'Bearer test_token' }
  });

  beforeEach((): void => {
    mockFetch.mockReset();
  });

  describe(HttpMethod.Get, (): void => {
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

      const [ error, result, metadata ] = await apiClient.sendRequest(HttpMethod.Get, '/exercises');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${baseUrl}/exercises`,
        expect.objectContaining({ method: 'GET' })
      );
      expect(error?.message).toStrictEqual(responseBody.error.message);
      expect(metadata?.statusCode).toBe(500);
      expect(metadata?.debugInfo?.statusCode).toBe(500);
      expect(result).toBeUndefined();
    });

    it('should handle fetch error', async (): Promise<void> => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const [ error, result, metadata ] = await apiClient.sendRequest(HttpMethod.Get, '/');

      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toBe('Network error');
      expect(result).toBeUndefined();
      expect(metadata).toBeUndefined();
    });

    it('should return error for non-supported content type', async (): Promise<void> => {
      const responseBody = 'Plain text response';
      const responseInit: ResponseInit = {
        status: HttpStatusCode.Ok,
        statusText: HttpStatusMessage.Ok,
        headers: { 'Content-Type': 'text/plain' }
      };

      const mockResponse = new Response(responseBody, responseInit);

      mockFetch.mockResolvedValueOnce(mockResponse);

      const [ error, result, metadata ] = await apiClient.sendRequest(HttpMethod.Get, '/');

      expect(error).toBeInstanceOf(Error);
      expect(result).toBeUndefined();
      expect(metadata).toEqual(
        expect.objectContaining({
          statusCode: HttpStatusCode.Ok,
          statusMessage: HttpStatusMessage.Ok
        })
      );
    });
  });

  describe(HttpMethod.Post, (): void => {
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

      const [ error, result, metadata ] = await apiClient.sendRequest(
        HttpMethod.Post,
        '/auth/register',
        {
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' }
        });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${baseUrl}/auth/register`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody)
        })
      );
      expect(error).toBeUndefined();
      expect(result).toStrictEqual(responseBody.data);
      expect(metadata?.statusCode).toBe(HttpStatusCode.Ok);
      expect(metadata?.statusMessage).toBe(HttpStatusMessage.Ok);
      expect(metadata?.debugInfo?.statusCode).toBe(HttpStatusCode.Conflict);
      expect(metadata?.debugInfo?.statusMessage).toBe(
        HttpStatusMessage.Conflict
      );
    });
  });
});
