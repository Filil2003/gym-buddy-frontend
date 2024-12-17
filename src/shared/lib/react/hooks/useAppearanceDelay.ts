import { useEffect, useState } from 'react';

interface Options {
  defaultValue?: boolean;
  appearanceDelay?: number;
  minDisplay?: number;
}

export function useAppearanceDelay(
  show: boolean,
  {
    defaultValue = false,
    appearanceDelay = 100,
    minDisplay = 100
  }: Options = {}
): boolean {
  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setDelayedShow(show);
      },
      show ? appearanceDelay : minDisplay
    );

    return () => clearTimeout(timer);
  }, [show, appearanceDelay, minDisplay]);

  return delayedShow;
}
