import { Button, Form } from 'antd';
import type React from 'react';

type Props = {
  isFetching: boolean;
  renderMessage: React.ReactNode;
};

export const FormActions = ({ isFetching, renderMessage }: Props) => (
  <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      block={true}
      loading={isFetching}
      style={{ marginBottom: '1em' }}
    >
      {isFetching ? 'Await...' : 'Submit'}
    </Button>
    {renderMessage}
  </Form.Item>
);
