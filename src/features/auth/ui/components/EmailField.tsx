import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export const EmailField = () => (
  <Form.Item
    label="Почта"
    name="email"
    hasFeedback={true}
    validateTrigger={false}
    rules={[
      {
        required: true,
        message: 'Пожалуйста, введите свою почту!'
      },
      {
        type: 'email',
        message: 'Это не похоже на почту!'
      }
    ]}
  >
    <Input
      autoComplete="username"
      prefix={<UserOutlined/>}
      placeholder="user@gmail.com"
    />
  </Form.Item>
);
