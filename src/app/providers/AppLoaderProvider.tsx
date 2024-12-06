import { useExerciseStore } from '#entities/exercise';
import { usePlanStore } from '#entities/plan';
import { type ReactNode, useEffect } from 'react';

export function AppLoaderProvider({ children }: { children?: ReactNode }) {
  const loadExercises = useExerciseStore((store) => store.loadExercises);
  const loadPlans = usePlanStore((store) => store.loadPlans);

  useEffect(() => {
    Promise.all([loadExercises(), loadPlans()]);
  });

  return children;
}
