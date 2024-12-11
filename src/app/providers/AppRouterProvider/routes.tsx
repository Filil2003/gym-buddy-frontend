import { CreateExercisePage } from '#pages/exercises/CreateExercisePage.tsx';
import { EditExercisePage } from '#pages/exercises/EditExercisePage.tsx';
import { ExercisesListPage } from '#pages/exercises/ExercisesListPage.tsx';
import { NotFoundPage } from '#pages/NotFoundPage.tsx';
import { CreatePlanPage } from '#pages/plans/CreatePlanPage.tsx';
import { EditPlanPage } from '#pages/plans/EditPlanPage.tsx';
import { PlansListPage } from '#pages/plans/PlansListPage.tsx';
import { RegisterPage } from '#pages/RegisterPage.tsx';
import { SignInPage } from '#pages/SignInPage.tsx';
import { WorkoutProgressPage } from '#pages/workouts/WorkoutProgressPage.tsx';
import { WorkoutsListPage } from '#pages/workouts/WorkoutsListPage.tsx';
import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout.tsx';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { redirectAuthorizedUser, redirectUnauthorizedUser } from './utils.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    loader: redirectUnauthorizedUser,
    children: [
      {
        path: 'exercises',
        element: <ExercisesListPage />
      },
      {
        path: 'exercises/create',
        element: <CreateExercisePage />
      },
      {
        path: 'exercises/:id',
        element: <EditExercisePage />
      },
      {
        path: 'plans',
        element: <PlansListPage />
      },
      {
        path: 'plans/create',
        element: <CreatePlanPage />
      },
      {
        path: 'plans/:id',
        element: <EditPlanPage />
      },
      {
        path: 'workouts',
        element: <WorkoutsListPage />
      },
      {
        path: 'workout/progress/:id',
        element: <WorkoutProgressPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    loader: redirectAuthorizedUser,
    children: [
      {
        index: true,
        element: <SignInPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'sign-in',
        element: <SignInPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
