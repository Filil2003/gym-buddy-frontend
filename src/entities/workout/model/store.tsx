import { sendApiRequest } from '#shared/lib/api-client';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getAll } from '../api/requests.ts';
import type { Workout } from './types.ts';

type WorkoutStore = WorkoutState & WorkoutActions;

interface WorkoutState {
  workouts: Workout[];
}

interface WorkoutActions {
  loadWorkouts: () => void;
  addWorkout: (workout: Workout) => void;
}

type WorkoutMiddlewares = [['zustand/devtools', never]];

const WorkoutSlice: StateCreator<WorkoutStore, WorkoutMiddlewares> = (
  setState
): WorkoutStore => ({
  workouts: [],

  loadWorkouts: (): void => {
    sendApiRequest<Workout[]>(getAll()).then(([_, workouts]) => {
      if (workouts) setState({ workouts });
    });
  },

  addWorkout: (workout: Workout) => {
    setState((state) => ({
      workouts: [workout, ...state.workouts]
    }));
  }
});

export const useWorkoutStore = create(devtools(WorkoutSlice));
