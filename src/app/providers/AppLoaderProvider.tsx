import { useExerciseStore } from '#entities/exercise';
import { usePlanStore } from '#entities/plan';
import { useWorkoutStore } from '#entities/workout';
import { type ReactNode, useEffect } from 'react';

export function AppLoaderProvider({ children }: { children?: ReactNode }) {
  const loadExercises = useExerciseStore((store) => store.loadExercises);
  const loadPlans = usePlanStore((store) => store.loadPlans);
  const loadWorkouts = useWorkoutStore((store) => store.loadWorkouts);

  useEffect(() => {
    Promise.all([loadExercises(), loadPlans(), loadWorkouts()]);
  });

  return children;
}
