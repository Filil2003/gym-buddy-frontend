import { type Exercise, useExerciseStore } from '#entities/exercise';
import { useEffect, useState } from 'react';

export function useExercises() {
  const exercises: Exercise[] = useExerciseStore((state) => state.exercises);

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);

  useEffect((): void => {
    setAvailableExercises(exercises);
  }, [exercises]);

  return [
    [selectedExercises, setSelectedExercises],
    [availableExercises, setAvailableExercises]
  ] as const;
}
