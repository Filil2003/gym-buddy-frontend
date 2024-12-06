import type { Exercise } from '#entities/exercise';
import type { Dispatch, SetStateAction } from 'react';

export interface Board {
  title: string;
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
}
