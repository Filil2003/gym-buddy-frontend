import { useCallback, useState } from 'react';

interface Result {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(): Result {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((): void => setIsOpen(true), []);
  const close = useCallback((): void => setIsOpen(false), []);
  const toggle = useCallback((): void => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}
