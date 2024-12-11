import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { comparePasswords } from '../../validators/comparePasswords.ts';

export const ConfirmPasswordField = () => (
  <Form.Item
    label="Подтвердите пароль"
    name="confirmPassword"
    dependencies={['password']}
    hasFeedback={true}
    rules={[
      { required: true, message: 'Пожалуйста, подтвердите свой пароль!' },
      ({ getFieldValue }) => comparePasswords(getFieldValue)
    ]}
  >
    <Input
      autoComplete="new-password"
      prefix={<LockOutlined />}
      type="password"
    />
  </Form.Item>
);
