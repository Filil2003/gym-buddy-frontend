import type { Theme } from '../../types.ts';
import { components } from './components.ts';
import { token } from './token.ts';

export const light: Theme = {
  token,
  components
} as const;
