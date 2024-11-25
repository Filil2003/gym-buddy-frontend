import { GithubOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <Layout.Footer style={{ borderTop: '1px solid black' }}>
      <Space direction="vertical">
        <Typography.Text>
          This is a personal pet project. Check out the source code on{' '}
          <Link
            to={'https://github.com/Filil2003/gym-buddy-frontend'}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <GithubOutlined />
          </Link>
        </Typography.Text>
      </Space>
    </Layout.Footer>
  );
}
