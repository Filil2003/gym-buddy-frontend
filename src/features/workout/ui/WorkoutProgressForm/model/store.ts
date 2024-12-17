import type { Exercise } from '#entities/exercise';
import type { Plan } from '#entities/plan';
import type { WorkoutExercise } from '#entities/workout';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type WorkoutProgressStore = WorkoutProgressState & WorkoutProgressActions;

interface WorkoutProgressState {
  step: number;
  totalSteps: number;
  exercises: WorkoutExercise[];
  startedAt: string;
}

interface WorkoutProgressActions {
  initializeProgress: (plan: Plan) => void;
  updateSet: (setIndex: number, reps: number, weight: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

type WorkoutProgressMiddlewares = [['zustand/devtools', never]];

const WorkoutProgressSlice: StateCreator<
  WorkoutProgressStore,
  WorkoutProgressMiddlewares
> = (setState, getState): WorkoutProgressStore => ({
  step: 1,
  totalSteps: 1,
  exercises: [],
  startedAt: new Date().toISOString(),

  initializeProgress: ({ exercises }: Plan) => {
    setState({
      step: 1,
      totalSteps: exercises.length,
      startedAt: new Date().toISOString(),
      exercises: exercises.map(
        (exercise: Exercise): WorkoutExercise => ({
          ...exercise,
          sets: []
        })
      )
    });
  },

  updateSet: (setIndex, reps, weight) => {
    const updatedExercises: WorkoutExercise[] = getState().exercises;

    const currentExercise = updatedExercises.at(getState().step - 1);
    if (currentExercise) currentExercise.sets[setIndex] = { reps, weight };

    setState({ exercises: updatedExercises });
  },

  nextStep: () => {
    const { step, totalSteps } = getState();
    if (step < totalSteps) setState({ step: step + 1 });
  },

  prevStep: () => {
    const { step } = getState();
    if (step > 1) setState({ step: step - 1 });
  }
});

export const useWorkoutProgressStore = create(devtools(WorkoutProgressSlice));
