import { type Exercise, useExerciseStore } from '#entities/exercise';
import { useApiClient } from '#shared/lib/api-client';
import { useEffect } from 'react';
import { getAll } from '../api/exercise.requests.ts';

export function useLoadExercises() {
  const setExercises = useExerciseStore((state) => state.setExercises);
  const [sendRequest] = useApiClient();

  useEffect(() => {
    sendRequest<Exercise[]>(getAll()).then(([_, body]) => {
      if (body) setExercises(body);
    });
  });
}
