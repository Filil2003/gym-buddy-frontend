import { SignInForm } from '#features/authentication';
import { Flex } from 'antd';

export function SignInPage() {
  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100%' }}>
      <SignInForm />
    </Flex>
  );
}
