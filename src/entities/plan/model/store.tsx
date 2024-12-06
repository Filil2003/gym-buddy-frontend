import { sendApiRequest } from '#shared/lib/api-client';
import { create, type StateCreator } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { getAll } from '../api/requests.ts';
import type { Plan, Exercise } from './types.ts';

type PlanStore = PlanState & PlanActions;

interface PlanState {
  plans: Plan[];
}

interface PlanActions {
  loadPlans: () => void;
  setPlans: (plans: Plan[]) => void;
  getPlan: (id: string) => Plan | undefined;
  getPlanExercises: (id: string) => Exercise[];
  addPlan: (plan: Plan) => void;
  updatePlan: (id: string, updatedPlan: Partial<Plan>) => void;
  removePlan: (id: string) => void;
}

type PlanMiddlewares = [['zustand/devtools', never]];

const PlanSlice: StateCreator<PlanStore, PlanMiddlewares> = (
  setState,
  getState
): PlanStore => ({
  plans: [],

  loadPlans: () => {
    sendApiRequest<Plan[]>(getAll()).then(([_, plans]) => setState({ plans }));
  },

  setPlans: (plans) =>
    setState(() => ({
      plans
    })),

  getPlanExercises: (id) =>
    getState().plans.find((plan) => plan.id === id)?.exercises ?? [],

  getPlan: (id) => getState().plans.find((plan) => plan.id === id),

  addPlan: (plan) =>
    setState((state) => ({
      plans: [...state.plans, plan]
    })),

  updatePlan: (id, updatedPlan) =>
    setState((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === id ? { ...plan, ...updatedPlan } : plan
      )
    })),

  removePlan: (id) =>
    setState((state) => ({
      plans: state.plans.filter((plan) => plan.id !== id)
    }))
});

export const usePlanStore = create(devtools(PlanSlice));
