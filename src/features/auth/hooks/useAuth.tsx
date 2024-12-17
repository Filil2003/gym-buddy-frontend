import { useSessionStore } from '#entities/session';
import { type ApiRequest, useApiClient } from '#shared/lib/api-client';
import { message } from 'antd';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import type { AuthCredentials, AuthResponse } from '../types.ts';

export function useAuth(request: (credentials: AuthCredentials) => ApiRequest) {
  const [sendRequest, isFetching] = useApiClient();
  const setSessionToken = useSessionStore((state) => state.setSessionToken);
  const navigate: NavigateFunction = useNavigate();

  const sendAuthRequest = async (credentials: AuthCredentials) => {
    const [error, body, metadata] = await sendRequest<AuthResponse>(
      request(credentials)
    );

    if (error) {
      if (error.name === 'AbortError') return;
      message.error(`${metadata?.statusCode ?? ''} ${error.message}`);
      return;
    }

    if (body?.authToken) setSessionToken(body.authToken);

    message.success('Successful');
    navigate('/');
  };

  return [sendAuthRequest, isFetching] as const;
}
