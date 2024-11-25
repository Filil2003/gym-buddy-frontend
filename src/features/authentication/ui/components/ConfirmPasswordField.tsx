import { comparePasswords } from '#features/authentication/model/validators.ts';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export const ConfirmPasswordField = () => (
  <Form.Item
    label="Confirm Password"
    name="confirmPassword"
    dependencies={['password']}
    hasFeedback={true}
    rules={[
      { required: true, message: 'Please confirm your password!' },
      ({ getFieldValue }) => comparePasswords(getFieldValue)
    ]}
  >
    <Input
      autoComplete="new-password"
      prefix={<LockOutlined />}
      type="password"
      placeholder="Password"
    />
  </Form.Item>
);
