import { create, type StateCreator } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import type { Exercise, QueryParams } from './types.ts';

type ExerciseStore = ExerciseState & ExerciseActions;

interface ExerciseState {
  exercises: Exercise[];
  queryParams: QueryParams;
}

interface ExerciseActions {
  setExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, updatedExercise: Partial<Exercise>) => void;
  removeExercise: (id: string) => void;
  setQueryParams: (queryParams: QueryParams) => void;
  getFilteredExercises: () => Exercise[];
}

type ExerciseMiddlewares = [['zustand/devtools', never]];

const exerciseSlice: StateCreator<ExerciseStore, ExerciseMiddlewares> = (
  setState,
  getState
): ExerciseStore => ({
  exercises: [],
  queryParams: {
    search: ''
  },

  setExercises: (exercises) =>
    setState(() => ({
      exercises
    })),

  addExercise: (exercise) =>
    setState((state) => ({
      exercises: [...state.exercises, exercise]
    })),

  updateExercise: (id, updatedExercise) =>
    setState((state) => ({
      exercises: state.exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
      )
    })),

  removeExercise: (id) =>
    setState((state) => ({
      exercises: state.exercises.filter((exercise) => exercise.id !== id)
    })),

  setQueryParams: (queryParams) =>
    setState({ queryParams: { ...getState().queryParams, ...queryParams } }),

  getFilteredExercises: () => {
    const { exercises, queryParams } = getState();
    const search: string = queryParams.search.toLowerCase();

    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(search)
    );
  },
});

export const useExerciseStore = create(devtools(exerciseSlice));
