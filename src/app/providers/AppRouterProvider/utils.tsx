import { isAuthorized } from '#entities/session';
import { redirect } from 'react-router-dom';

export function redirectAuthorizedUser(): Response | null {
  return handleRedirect([{ condition: isAuthorized(), redirectTo: '/' }]);
}

export function redirectUnauthorizedUser(): Response | null {
  return handleRedirect([
    { condition: !isAuthorized(), redirectTo: '/auth/register' }
  ]);
}

type RedirectRule = {
  condition: boolean;
  redirectTo: string;
};

function handleRedirect(rules: RedirectRule[]): Response | null {
  for (const rule of rules) {
    if (rule.condition) return redirect(rule.redirectTo);
  }
  return null;
}
