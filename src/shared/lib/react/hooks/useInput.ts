import { useRef, useState } from 'react';

export const useInput = (initialState: string | (() => string)) => {
  const initialStateRef = useRef(initialState).current;

  const [value, setValue] = useState(initialState);

  const reset = (): void =>
    setValue(
      typeof initialStateRef === 'function'
        ? initialStateRef()
        : initialStateRef
    );

  return [value, setValue, reset] as const;
};
