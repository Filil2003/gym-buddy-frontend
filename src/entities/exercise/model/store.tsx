import { sendApiRequest } from '#shared/lib/api-client';
import { create, type StateCreator } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { getAll } from '../api/requests.ts';
import type { Exercise, QueryParams } from './types.ts';

type ExerciseStore = ExerciseState & ExerciseActions;

interface ExerciseState {
  exercises: Exercise[];
  queryParams: QueryParams;
}

interface ExerciseActions {
  loadExercises: () => void;
  setExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, updatedExercise: Partial<Exercise>) => void;
  removeExercise: (id: string) => void;
  setQueryParams: (queryParams: QueryParams) => void;
  getFilteredExercises: () => Exercise[];
  filterOutExercises: (exclude: Exercise[]) => Exercise[];
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

  loadExercises: () => {
    sendApiRequest<Exercise[]>(getAll()).then(([_, exercises]) =>
      setState({ exercises })
    );
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

  filterOutExercises: (exclude: Exercise[]) => {
    return getState().exercises.filter(
      (exercise) => !exclude.some((excluded) => excluded.id === exercise.id)
    );
  }
});

export const useExerciseStore = create(devtools(exerciseSlice));
