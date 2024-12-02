import { useCallback, useRef } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: <The function can accept parameters of any type>
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number>();

  return useCallback(
    (...args: Parameters<T>): void => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout((): void => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
