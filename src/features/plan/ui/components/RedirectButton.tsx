import { Button } from 'antd';
import { type NavigateFunction, useNavigate } from 'react-router-dom';

interface Props {
  to: string;
  children: string;
}

export function RedirectButton({ to, children }: Props) {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Button onClick={() => navigate(to)} type="primary">
      {children}
    </Button>
  );
}
