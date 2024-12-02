import { ExercisesList, useLoadExercises } from '#features/exercise';

export function ExercisesListPage() {
  useLoadExercises();

  return <ExercisesList />;
}
