import { Form as AntdForm } from 'antd';
import type { FormProps } from 'antd/lib/form';
import type React from 'react';

type Props = {
  children: React.ReactNode;
} & FormProps;

export const Form = ({ children, ...props }: Props) => (
  <AntdForm
    style={{ maxWidth: '312px', width: '100%', paddingInline: '8px' }}
    requiredMark={'optional'}
    name="register-form"
    size="large"
    variant="filled"
    layout="vertical"
    {...props}
  >
    {children}
  </AntdForm>
);
