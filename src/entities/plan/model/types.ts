export interface Plan {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  imageFileName?: string;
  note?: string;
}

export interface CreatePlanData {
  name: string;
  exercises: string[];
}
export type UpdatePlanData = CreatePlanData;
