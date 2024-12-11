import { useSessionStore } from '#entities/session';
import { Button } from 'antd';
import { type NavigateFunction, useNavigate } from 'react-router-dom';

export const SignOutButton = () => {
  const clearSession = useSessionStore((state) => state.clearSession);
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/auth/sign-in');
  };

  return (
    <Button type="link" onClick={handleLogout}>
      Выход
    </Button>
  );
};
