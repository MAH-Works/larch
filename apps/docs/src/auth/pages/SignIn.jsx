import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Card, CheckRow, Field, TextInput, useToast } from '@compass/ui';
import { AuthTopbar, EMAIL_RE, LegalNote, OrDivider, PasswordInput, SocialButtons, SubmitButton, useFakeRequest } from '../shared.jsx';

/** Variant 1 — centered card: SSO, email + password, remember me, inline errors. */
export default function SignIn() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pending, request] = useFakeRequest();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [authError, setAuthError] = useState(null);

  const errors = {
    email: !email ? 'Enter your email.' : !EMAIL_RE.test(email) ? 'Enter a valid email address.' : null,
    password: !password ? 'Enter your password.' : password.length < 8 ? 'Passwords are at least 8 characters.' : null,
  };
  const show = (key) => (submitted ? errors[key] : null);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setAuthError(null);
    if (errors.email || errors.password) return;
    request(() => {
      if (password === 'wrongpass') {
        setAuthError('That email and password don’t match. Try again or sign in with a code.');
        return;
      }
      showToast('Signed in');
      navigate('/examples/crm/overview');
    });
  };

  const sso = (provider) => request(() => {
    showToast(`Signed in with ${provider}`);
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

            <form noValidate onSubmit={onSubmit}>
              <Field label="Email" id="si-email" error={show('email')}>
                <TextInput
                  id="si-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  invalid={!!show('email')}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Password" id="si-password" error={show('password')}>
                <PasswordInput
                  id="si-password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  invalid={!!show('password')}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              <div className="my-4 flex items-center justify-between gap-3">
                <CheckRow defaultChecked>Remember me for 30 days</CheckRow>
                <Link to="/examples/auth/passwordless" className="text-xs font-medium text-blue no-underline hover:underline">
                  Forgot password?
                </Link>
              </div>

              <SubmitButton pending={pending} pendingLabel="Signing in…">
                Sign in
              </SubmitButton>
            </form>
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
