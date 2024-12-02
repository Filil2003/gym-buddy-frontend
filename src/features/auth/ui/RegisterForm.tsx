import { useAppearanceDelay } from '#shared/lib/react/hooks/useAppearanceDelay.ts';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { register } from '../api/session.requests.ts';
import { useAuth } from '../hooks/useAuth.tsx';
import {
  ConfirmPasswordField,
  EmailField,
  Form,
  FormActions,
  PasswordField
} from './components/index.ts';

export function RegisterForm() {
  const [sendRegisterRequest, isFetching] = useAuth(register);
  const isDelayedFetching: boolean = useAppearanceDelay(isFetching);

  return (
    <Form onFinish={sendRegisterRequest} disabled={isDelayedFetching}>
      <Typography.Title style={{ textAlign: 'center' }}>
        Register
      </Typography.Title>
      <EmailField />
      <PasswordField />
      <ConfirmPasswordField />
      <FormActions
        showLoader={isDelayedFetching}
        renderMessage={
          <Typography.Text>
            Already have an account? <Link to="/auth/sign-in">Sign In!</Link>
          </Typography.Text>
        }
      />
    </Form>
  );
}
