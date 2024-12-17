import { Layout, Space, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <Layout.Footer style={{ borderTop: '1px solid #f0f0f0' }}>
      <Space
        direction="vertical"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography.Text style={{ textAlign: 'center' }}>
          Это учебный пет-проект. Исходный код можно найти на GitHub:
        </Typography.Text>
        <Space size="middle">
          <Link
            to={'https://github.com/Filil2003/gym-buddy-frontend'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend Repository <GithubOutlined />
          </Link>
          <Link
            to={'https://github.com/Filil2003/gym-buddy-backend'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend Repository <GithubOutlined />
          </Link>
        </Space>
      </Space>
    </Layout.Footer>
  );
}
