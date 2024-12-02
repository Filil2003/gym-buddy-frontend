import { AntdConfigProvider } from './providers/AntdConfigProvider/index.tsx';
import { AppRouterProvider } from './providers/AppRouterProvider/index.tsx';

export const App = () => (
  <AntdConfigProvider>
    <AppRouterProvider />
  </AntdConfigProvider>
);
