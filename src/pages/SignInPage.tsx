import { SignInForm } from '#features/auth';
import { Flex } from 'antd';

export function SignInPage() {
  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100%' }}>
      <SignInForm />
    </Flex>
  );
}
