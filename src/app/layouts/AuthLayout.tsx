import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <Layout style={{ height: '100%' }}>
    <Layout.Content>
      <Outlet />
    </Layout.Content>
  </Layout>
);
