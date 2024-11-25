import { HttpApiClient } from '#shared/lib/httpApiClient';
import { AntdConfigProvider } from './providers/AntdConfigProvider/index.tsx';
import { AppRouterProvider } from './providers/AppRouterProvider/index.tsx';

HttpApiClient.getInstance('http://dev.localhost:8080');

export const App = () => (
  <AntdConfigProvider>
    <AppRouterProvider />
  </AntdConfigProvider>
);
