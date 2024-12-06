import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ComponentProps } from 'react';
import { useRemoveExercise } from '../hooks/useRemoveExercise.ts';

interface Props extends ComponentProps<typeof Button> {
  id: string;
}

export function RemoveButton({ id, children, ...props }: Props) {
  const [sendRemoveRequest, isFetching] = useRemoveExercise(id);

  return (
    <Button
      type="default"
      danger={true}
      onClick={sendRemoveRequest}
      loading={isFetching}
      icon={<DeleteOutlined />}
      {...props}
    >
      {children}
    </Button>
  );
}
