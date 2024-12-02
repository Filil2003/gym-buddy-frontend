import { RegisterForm } from '#features/auth';
import { Flex } from 'antd';

export function RegisterPage() {
  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100%' }}>
      <RegisterForm />
    </Flex>
  );
}
