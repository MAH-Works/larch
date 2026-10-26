import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Card, Checkbox, Field, Form, Input, Toast } from '@mah-works/larch';
import { AuthTopbar, EMAIL_RE, LegalNote, OrDivider, PasswordInput, SocialButtons, SubmitButton, useFakeRequest } from '../shared.jsx';

const validateEmail = (value) => (!value ? 'Enter your email.' : !EMAIL_RE.test(value) ? 'Enter a valid email address.' : null);
const validatePassword = (value) =>
  !value ? 'Enter your password.' : value.length < 8 ? 'Passwords are at least 8 characters.' : null;

/** Variant 1 — centered card: SSO, email + password, remember me, inline errors. */
export default function SignIn() {
  const navigate = useNavigate();
  const toastManager = Toast.useToastManager();
  const [pending, request] = useFakeRequest();
  const [authError, setAuthError] = useState(null);

  // Base UI's Form runs every Field's `validate` on submit and only calls onFormSubmit when all pass.
  const onFormSubmit = ({ password }) => {
    setAuthError(null);
    request(() => {
      if (password === 'wrongpass') {
        setAuthError('That email and password don’t match. Try again or sign in with a code.');
        return;
      }
      toastManager.add({ title: 'Signed in' });
      navigate('/examples/crm/overview');
    });
  };

  const sso = (provider) => request(() => {
    toastManager.add({ title: `Signed in with ${provider}` });
    navigate('/examples/crm/overview');
  });

  return (
    <div className="flex min-h-screen flex-col bg-canvas px-[33px] py-6 text-ink tablet:px-5 mobile:px-[13px]">
      <AuthTopbar />

      <main className="flex flex-1 items-center justify-center py-10">
        <div className="w-[min(400px,100%)]">
          <Card className="p-7 mobile:p-5">
            <h1 className="m-0 text-[22px] font-[650] tracking-[-.04em]">Sign in to Compass</h1>
            <p className="mb-6 mt-[6px] text-[13px] text-muted">Welcome back. Pick up where your team left off.</p>

            <SocialButtons onSelect={sso} />
            <OrDivider>or continue with email</OrDivider>

            {authError && (
              <Alert tone="danger" title="Couldn’t sign you in" className="mb-4">
                {authError}
              </Alert>
            )}

            <Form onFormSubmit={onFormSubmit}>
              <Field.Root name="email" validate={validateEmail}>
                <Field.Label>Email</Field.Label>
                <Input inputMode="email" autoComplete="email" placeholder="you@company.com" />
                <Field.Error />
              </Field.Root>
              <Field.Root name="password" validate={validatePassword}>
                <Field.Label>Password</Field.Label>
                <PasswordInput autoComplete="current-password" placeholder="••••••••" />
                <Field.Error />
              </Field.Root>

              <div className="my-4 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs text-[#656b74] dark:text-muted">
                  <Checkbox.Root name="remember" defaultChecked>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  Remember me for 30 days
                </label>
                <Link to="/examples/auth/passwordless" className="text-xs font-medium text-blue no-underline hover:underline">
                  Forgot password?
                </Link>
              </div>

              <SubmitButton pending={pending} pendingLabel="Signing in…">
                Sign in
              </SubmitButton>
            </Form>
          </Card>

          <p className="mb-5 mt-5 text-center text-xs text-muted">
            Don’t have an account?{' '}
            <Link to="/examples/auth/sign-up" className="font-semibold text-blue no-underline hover:underline">
              Create a workspace
            </Link>
          </p>
          <LegalNote />
          <p className="mb-0 mt-3 text-center text-[11px] text-faint">
            Demo: any email and an 8+ character password signs in. Use <span className="font-mono">wrongpass</span> to see the error state.
          </p>
        </div>
      </main>
    </div>
  );
}
