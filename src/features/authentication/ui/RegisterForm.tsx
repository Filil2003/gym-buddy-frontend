import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthRequest } from '../model/useRequestHandler.tsx';
import {
  ConfirmPasswordField,
  EmailField,
  Form,
  FormActions,
  PasswordField
} from './components/index.ts';

export function RegisterForm() {
  const [sendRegisterRequest, isFetching] = useAuthRequest(
    'register',
    'Registered successfully!'
  );

  return (
    <Form onFinish={sendRegisterRequest} disabled={isFetching}>
      <Typography.Title style={{ textAlign: 'center' }}>
        Register
      </Typography.Title>
      <EmailField />
      <PasswordField />
      <ConfirmPasswordField />
      <FormActions
        isFetching={isFetching}
        renderMessage={
          <Typography.Text>
            Already have an account? <Link to="/auth/sign-in">Sign In!</Link>
          </Typography.Text>
        }
      />
    </Form>
  );
}
