import { Layout } from 'antd';

export function Header() {
  return (
    <Layout.Header style={{borderBottom: '1px solid inherit'}}>
      <strong style={{ color: '#1677ff'}}>Gym Buddy</strong> - Планы тренировок и отслеживание прогресса
    </Layout.Header>
  );
}
