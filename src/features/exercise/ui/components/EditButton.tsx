import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

interface Props extends ComponentProps<typeof Button> {
  id: string;
}

export function EditButton({ id, children }: Props) {
  return (
    <Link to={`/exercises/${id}`}>
      <Button icon={<EditOutlined />} type="primary">
        {children}
      </Button>
    </Link>
  );
}
