// Auth page variants. `path` is relative to /examples/auth.
export const AUTH_PAGES = [
  { path: 'sign-in', title: 'Sign in · centered card', icon: 'lock', summary: 'SSO buttons, email + password with show/hide, remember me, inline validation and a credential-error alert.', uses: ['Card', 'Field', 'TextInput', 'CheckRow', 'Alert'] },
  { path: 'sign-up', title: 'Sign up · split screen', icon: 'users', summary: 'Workspace sign-up with a password-strength meter beside a testimonial and live product preview.', uses: ['Field', 'SelectInput', 'ProgressBar', 'MetricCard', 'AccountItem'] },
  { path: 'passwordless', title: 'Passwordless · email code', icon: 'mail', summary: 'Two-step flow: email, then a 6-digit code with auto-advance, paste-to-fill, resend countdown and a success step.', uses: ['TextInput', 'Alert', 'Button', 'Icon'] },
];
