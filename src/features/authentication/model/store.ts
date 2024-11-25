import type { StateCreator } from 'zustand';
import { create } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';

type AuthStore = AuthState & AuthActions;

interface AuthState {
  authToken: string | null;
}

interface AuthActions {
  setAuthToken: (token: string) => void;
  clearAuthToken: () => void;
  isAuthorized: () => boolean;
}

type AuthMiddlewares = [
  ['zustand/devtools', never],
  ['zustand/persist', unknown]
];

const authSlice: StateCreator<AuthStore, AuthMiddlewares> = (
  setState,
  getState
): AuthStore => ({
  authToken: null,
  setAuthToken: (token: string): void => setState({ authToken: token }),
  clearAuthToken: (): void => setState({ authToken: null }),
  isAuthorized: () => getState().authToken !== null
});

export const useAuthStore = create(
  devtools(
    persist(authSlice, {
      name: 'authentication'
    })
  )
);

export const isAuthorized = (): boolean =>
  useAuthStore.getState().isAuthorized();

export const clearAuthToken = (): void =>
  useAuthStore.getState().clearAuthToken();
