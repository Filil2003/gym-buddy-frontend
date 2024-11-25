import type { UserCredentials } from '#entities/user/model/types.ts';
import { HttpMethod } from '#shared/enums/http';
import {
  type HttpApiResponse,
  useHttpApiClient
} from '#shared/lib/httpApiClient';
import { useState } from 'react';
import { useAuthStore } from '../model/store.ts';

interface ApiResponse {
  authToken: string;
}

export function useAuth(endpoint: 'register' | 'sign-in') {
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const apiRequest = useHttpApiClient<ApiResponse>(
    HttpMethod.Post,
    `/auth/${endpoint}`,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
  const [ isFetching, setIsFetching ] = useState(false);

  const sendAuthRequest = async (
    credentials: UserCredentials
  ): Promise<HttpApiResponse<ApiResponse>> => {
    setIsFetching(true);
    const [ error, body, metadata ] = await apiRequest({
      body: JSON.stringify(credentials)
    });
    setIsFetching(false);

    if (error) return [ error, undefined, metadata ];

    if (body?.authToken) setAuthToken(body.authToken);

    return [ undefined, body, metadata ];
  };

  return [ sendAuthRequest, isFetching ] as const;
}
