export interface Exercise {
  id: string;
  name: string;
  description?: string;
  imageFileName?: string;
  note?: string;
}

export type CreateExerciseData = Omit<Exercise, 'id'>;
export type UpdateExerciseData = Partial<Omit<Exercise, 'id'>>;

export type QueryParams = {
  search: string;
};
