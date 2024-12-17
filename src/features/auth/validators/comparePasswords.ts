import type { FormInstance } from 'antd';
import type { RuleObject } from 'antd/lib/form';

export const comparePasswords = (
  getFieldValue: FormInstance['getFieldValue']
): RuleObject => ({
  validator(_: RuleObject, value: string): Promise<void> {
    if (!value || getFieldValue('password') === value) return Promise.resolve();

    return Promise.reject(
      new Error('The new password that you entered do not match!')
    );
  }
});
