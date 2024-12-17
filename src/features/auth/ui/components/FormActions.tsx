import { Button, Form } from 'antd';
import type React from 'react';

type Props = {
  showLoader: boolean;
  renderMessage: React.ReactNode;
};

export const FormActions = ({ showLoader, renderMessage }: Props) => (
  <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      block={true}
      loading={showLoader}
      style={{ marginBottom: '1em' }}
    >
      {showLoader ? 'Ожидайте...' : 'Отправить'}
    </Button>
    {renderMessage}
  </Form.Item>
);
