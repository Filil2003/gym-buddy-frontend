import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export const PasswordField = () => (
  <Form.Item
    label="Пароль"
    name="password"
    hasFeedback={true}
    rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}
  >
    <Input
      autoComplete="new-password"
      prefix={<LockOutlined />}
      type="password"
    />
  </Form.Item>
);
