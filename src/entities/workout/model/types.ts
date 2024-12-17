export interface Workout {
  id: string;
  planTittle: string;
  startedAt: string;
  finishedAt: string;
  exercises: WorkoutExercise[];
}

export interface CreateWorkoutData {
  startedAt: string;
  finishedAt: string;
  exercises: {
    id: string;
    name?: string;
    description?: string;
    imageFileName?: string;
    note?: string;
    sets: WorkoutSet[];
  }[];
}

export interface WorkoutExercise {
  id: string;
  name?: string;
  description?: string;
  imageFileName?: string;
  note?: string;
  sets: WorkoutSet[];
}

interface WorkoutSet {
  reps: number;
  weight: number;
}
