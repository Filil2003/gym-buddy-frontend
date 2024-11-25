import { RegisterForm } from '#features/authentication';
import { Flex } from 'antd';

export function RegisterPage() {
  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100%' }}>
      <RegisterForm />
    </Flex>
  );
}
