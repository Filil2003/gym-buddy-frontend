import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthRequest } from '../model/useRequestHandler.tsx';
import {
  EmailField,
  Form,
  FormActions,
  PasswordField
} from './components/index.ts';

export function SignInForm() {
  const [sendSignInRequest, isFetching] = useAuthRequest(
    'sign-in',
    'Signed in successful!'
  );

  return (
    <Form onFinish={sendSignInRequest} disabled={isFetching}>
      <Typography.Title style={{ textAlign: 'center' }}>
        Sign In
      </Typography.Title>
      <EmailField />
      <PasswordField />
      <FormActions
        isFetching={isFetching}
        renderMessage={
          <Typography.Text>
            Don't have an account? <Link to="/auth/register">Register!</Link>
          </Typography.Text>
        }
      />
    </Form>
  );
}
