import { Banner } from '#widgets/Banner.tsx';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <Layout style={{ height: '100%' }}>
    <Banner/>
    <Layout.Content>
      <Outlet/>
    </Layout.Content>
  </Layout>
);
