import { ConfigProvider } from 'antd';
import english from 'antd/locale/en_US';
import type { ReactNode } from 'react';
import { light } from './themes/light/index.ts';

export function AntdConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider locale={english} theme={light}>
      {children}
    </ConfigProvider>
  );
}
