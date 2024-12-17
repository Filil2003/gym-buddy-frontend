export interface Exercise {
  id: string;
  name: string;
  description?: string;
  imageFileName?: string;
  note?: string;
}

export interface CreateExerciseData {
  name: string;
  description?: string;
  image?: File;
  note?: string;
}

export type UpdateExerciseData = Partial<Omit<Exercise, 'id'>>;

export type QueryParams = {
  search: string;
};
