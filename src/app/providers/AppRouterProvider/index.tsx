import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes.tsx';

const browserRouter = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true
  }
});

export const AppRouterProvider = () => (
  <RouterProvider
    router={browserRouter}
    future={{
      v7_startTransition: true
    }}
  />
);
