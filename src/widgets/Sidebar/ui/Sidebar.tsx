import { isAuthorized, useSessionStore } from '#entities/session';
import { SignOutButton } from '#features/auth';
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
    label: <Link to={'/exercises'}>Упражнения</Link>
  },
  {
    key: 'plans',
    style: { display: 'flex' },
    icon: <Icon component={PlanIcon} />,
    label: <Link to={'/plans'}>Планы</Link>
  },
  {
    key: 'workouts',
    style: { display: 'flex' },
    icon: <Icon component={WorkoutIcon} />,
    label: <Link to={'/workouts'}>Тренировки</Link>
  }
];

const userMenu: MenuItem[] = [
  {
    key: 'sign-out',
    icon: <LogoutOutlined />,
    label: <SignOutButton />
  }
];

export function Sidebar() {
  const tokenPayload = useSessionStore((state) => state.tokenPayload);

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
        boxShadow: '5px 0 50px #f2f2f2'
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

        {isAuthorized() && (
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
                  {tokenPayload?.email?.slice(0, 2).toUpperCase()}
                </Avatar>
                {!collapsed && (
                  <Typography.Text style={{ wordBreak: 'keep-all' }}>
                    {tokenPayload?.email}
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
