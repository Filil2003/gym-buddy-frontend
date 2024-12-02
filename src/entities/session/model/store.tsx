import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { create, type StateCreator } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';
import type { TokenPayload } from './types.ts';

type SessionStore = SessionState & SessionActions;

interface SessionState {
  token: string | null;
  tokenPayload: (TokenPayload & JwtPayload) | null;
}

interface SessionActions {
  isAuthorized: () => boolean;
  setSessionToken: (token: string) => void;
  clearSession: () => void;
}

type SessionMiddlewares = [
  ['zustand/devtools', never],
  ['zustand/persist', unknown]
];

const sessionSlice: StateCreator<SessionStore, SessionMiddlewares> = (
  setState,
  getState
): SessionStore => ({
  token: null,
  tokenPayload: null,

  isAuthorized: (): boolean => getState().token !== null,

  setSessionToken: (token: string): void => {
    const tokenPayload = jwtDecode<TokenPayload & JwtPayload>(token);

    setState({ token, tokenPayload });
  },

  clearSession(): void {
    setState({ token: null, tokenPayload: null });
  }
});

export const useSessionStore = create(
  devtools(
    persist(sessionSlice, {
      name: 'session'
    })
  )
);

export const isAuthorized = () => useSessionStore.getState().isAuthorized();
export const clearSession = () => useSessionStore.getState().clearSession();
export const getSessionToken = () => useSessionStore.getState().token;
