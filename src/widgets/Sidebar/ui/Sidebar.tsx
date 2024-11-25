import { clearAuthToken, useAuthStore } from '#features/authentication';
import Icon, {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  type MenuProps,
  Space,
  Typography
} from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseIcon from '../icons/excercise.svg?react';
import PlanIcon from '../icons/plan.svg?react';
import WorkoutIcon from '../icons/workout.svg?react';

type MenuItem = Required<MenuProps>['items'][number];

const navigationMenu: MenuItem[] = [
  {
    key: 'exercises',
    style: { display: 'flex' },
    icon: <Icon component={ExerciseIcon} />,
    label: <Link to={'/exercises'}>Exercises</Link>
  },
  {
    key: 'plans',
    style: { display: 'flex' },
    icon: <Icon component={PlanIcon} />,
    label: <Link to={'/plans'}>Plans</Link>
  },
  {
    key: 'workouts',
    style: { display: 'flex' },
    icon: <Icon component={WorkoutIcon} />,
    label: <Link to={'/workouts'}>Workouts</Link>
  }
];

const userMenu: MenuItem[] = [
  {
    key: 'sign-out',
    icon: <LogoutOutlined />,
    label: (
      <Link to={''} onClick={clearAuthToken}>
        Sign Out
      </Link>
    )
  }
];

export function Sidebar() {
  const isAuthorized = useAuthStore((state) => state.isAuthorized());

  const user = {
    email: 'filil2003@yandex.ru'
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Layout.Sider
      width={268}
      breakpoint={'md'}
      collapsible={true}
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      trigger={null}
      style={{
        padding: '8px',
        boxShadow: '5px 0 50px #f2f2f2',
        marginRight: '30px'
      }}
    >
      <Flex vertical={true} style={{ height: '100%' }}>
        <Button onClick={toggleCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        <Menu
          mode="vertical"
          items={navigationMenu}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center'
          }}
        />

        {isAuthorized && (
          <div style={{ padding: '16px' }}>
            <Dropdown
              arrow={true}
              menu={{
                items: userMenu
              }}
              trigger={['click']}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  style={{ backgroundColor: '#1677ff', userSelect: 'none' }}
                >
                  {user?.email?.slice(0, 2).toUpperCase()}
                </Avatar>
                {!collapsed && (
                  <Typography.Text style={{ wordBreak: 'keep-all' }}>
                    {user.email}
                  </Typography.Text>
                )}
              </Space>
            </Dropdown>
          </div>
        )}
      </Flex>
    </Layout.Sider>
  );
}
