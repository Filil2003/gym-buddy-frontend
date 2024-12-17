import {
  useAppearanceDelay
} from '#shared/lib/react/hooks/useAppearanceDelay.ts';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { signIn } from '../api/session.requests.ts';
import { useAuth } from '../hooks/useAuth.tsx';
import {
  EmailField,
  Form,
  FormActions,
  PasswordField
} from './components/index.ts';

export function SignInForm() {
  const [sendSignInRequest, isFetching] = useAuth(signIn);
  const isDelayedFetching: boolean = useAppearanceDelay(isFetching);

  return (
    <Form onFinish={sendSignInRequest} disabled={isDelayedFetching}>
      <Typography.Title style={{ textAlign: 'center' }}>
        Вход
      </Typography.Title>
      <EmailField />
      <PasswordField />
      <FormActions
        showLoader={isDelayedFetching}
        renderMessage={
          <Typography.Text>
            У вас нет учетной записи? <Link to="/auth/register">Создать!</Link>
          </Typography.Text>
        }
      />
    </Form>
  );
}
