import type { UserCredentials } from '#entities/user/model/types.ts';
import { message } from 'antd';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/index.ts';

export function useAuthRequest(
  action: 'register' | 'sign-in',
  successMessage: string,
  redirectPath?: string
) {
  const [ sendRequest, isFetching ] = useAuth(action);
  const navigate: NavigateFunction = useNavigate();

  const handleResponse = async (credentials: UserCredentials) => {
    const [ error, _, metadata ] = await sendRequest(credentials);

    if (error) {
      if (error.name === 'AbortError') return;
      message.error(`${metadata?.statusCode ?? ''} ${error.message}`);
      return;
    }

    message.success(successMessage);
    navigate(redirectPath ?? '/');
  };

  return [ handleResponse, isFetching ] as const;
}
