import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export const PasswordField = () => (
  <Form.Item
    label="Password"
    name="password"
    hasFeedback={true}
    rules={[{ required: true, message: 'Please input your password!' }]}
  >
    <Input
      autoComplete="new-password"
      prefix={<LockOutlined />}
      type="password"
      placeholder="Password"
    />
  </Form.Item>
);
