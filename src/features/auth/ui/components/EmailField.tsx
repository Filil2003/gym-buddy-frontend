import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export const EmailField = () => (
  <Form.Item
    label="Email"
    name="email"
    hasFeedback={true}
    validateTrigger={false}
    rules={[
      {
        required: true,
        message: 'Please input your email!'
      },
      {
        type: 'email',
        message: 'The input is not valid email!'
      }
    ]}
  >
    <Input
      autoComplete="username"
      prefix={<UserOutlined/>}
      placeholder="email"
    />
  </Form.Item>
);
