import { Footer } from '#widgets/Footer.tsx';
import { Header } from '#widgets/Header.tsx';
import { Sidebar } from '#widgets/Sidebar';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <Layout style={{ height: '100%' }}>
    <Sidebar />
    <Layout
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Header />
      <Layout.Content
        style={{
          flexGrow: 1,
          padding: '16px',
          overflow: 'auto'
        }}
      >
        <Outlet />
      </Layout.Content>
      <Footer />
    </Layout>
  </Layout>
);
