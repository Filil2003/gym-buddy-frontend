import { type Context, createContext, useContext } from 'react';

export function useStrictContext<T>(context: Context<T | null>): T {
  const value = useContext(context);
  if (value === null) throw new Error('Strict context not passed');
  return value;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}
