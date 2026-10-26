import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Field, Form, Icon, Input, OTPField, Toast } from '@mah-works/larch';
import { AuthTopbar, EMAIL_RE, LegalNote, SubmitButton, useFakeRequest } from '../shared.jsx';

const CODE_LENGTH = 6;

const RESEND_SECONDS = 30;

function StepTile({ icon, tone = 'blue' }) {
  const look = tone === 'green' ? 'bg-[#e5f7ed] text-green dark:bg-[#173c2e]' : 'bg-blue-soft text-blue';
  return (
    <div className={`mx-auto mb-5 grid size-12 place-items-center rounded-[12px] ${look}`}>
      <Icon name={icon} />
    </div>
  );
}

function Steps({ current }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-[6px]" aria-label={`Step ${current} of 2`}>
      {[1, 2].map((n) => (
        <span key={n} className={`h-[5px] rounded-full transition-all ${n === current ? 'w-6 bg-blue' : n < current ? 'w-[5px] bg-blue' : 'w-[5px] bg-line-strong'}`} />
      ))}
    </div>
  );
}

/** Variant 3 — passwordless: email → 6-digit code (paste, auto-advance, resend timer) → done. */
export default function Passwordless() {
  const navigate = useNavigate();
  const toastManager = Toast.useToastManager();
  const [pending, request] = useFakeRequest(800);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Called by the email Form once its Field validates, and by "Resend code".
  const sendCode = (to = email) => {
    setEmail(to);
    request(() => {
      setStep('code');
      setCode('');
      setCodeError(null);
      setCooldown(RESEND_SECONDS);
      toastManager.add({ title: `Code sent to ${to}` });
    });
  };

  const verify = (value = code) => {
    if (value.length < CODE_LENGTH) {
      setCodeError(`Enter all ${CODE_LENGTH} digits.`);
      return;
    }
    request(() => {
      if (value === '000000') {
        setCodeError('That code is incorrect or has expired.');
        setCode('');
        return;
      }
      setStep('done');
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas px-[33px] py-6 text-ink tablet:px-5 mobile:px-[13px]">
      <AuthTopbar />

      <main className="flex flex-1 items-center justify-center py-10">
        <div className="w-[min(380px,100%)] text-center">
          {step === 'email' && (
            <>
              <Steps current={1} />
              <StepTile icon="mail" />
              <h1 className="m-0 text-[22px] font-[650] tracking-[-.04em]">Sign in with a code</h1>
              <p className="mb-6 mt-[6px] text-[13px] leading-relaxed text-muted">
                No password needed. We’ll email you a 6-digit code that works for 10 minutes.
              </p>
              <Form onFormSubmit={(values) => sendCode(values.email)} className="text-left">
                <Field.Root name="email" validate={(v) => (EMAIL_RE.test(v) ? null : 'Enter a valid email address.')}>
                  <Field.Label>Email</Field.Label>
                  <Input inputMode="email" autoComplete="email" autoFocus placeholder="you@company.com" defaultValue={email} />
                  <Field.Error />
                </Field.Root>
                <div className="mt-4">
                  <SubmitButton pending={pending} pendingLabel="Sending code…">
                    Send code
                  </SubmitButton>
                </div>
              </Form>
              <p className="mb-6 mt-5 text-xs text-muted">
                Prefer a password?{' '}
                <Link to="/examples/auth/sign-in" className="font-semibold text-blue no-underline hover:underline">
                  Sign in with password
                </Link>
              </p>
              <LegalNote />
            </>
          )}

          {step === 'code' && (
            <>
              <Steps current={2} />
              <StepTile icon="lock" />
              <h1 className="m-0 text-[22px] font-[650] tracking-[-.04em]">Check your email</h1>
              <p className="mb-6 mt-[6px] text-[13px] leading-relaxed text-muted">
                Enter the code we sent to <strong className="font-semibold text-strong">{email}</strong>.
              </p>

              {codeError && (
                <Alert tone="danger" title="Couldn’t verify" className="mb-4 text-left">
                  {codeError}
                </Alert>
              )}

              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  verify();
                }}
              >
                <Field.Root invalid={!!codeError}>
                  <Field.Label className="sr-only">Verification code</Field.Label>
                  {/* OTPField handles auto-advance, backspace, arrow keys and paste-to-fill. */}
                  <OTPField.Root
                    length={CODE_LENGTH}
                    value={code}
                    disabled={pending}
                    onValueChange={(v) => {
                      setCode(v);
                      setCodeError(null);
                    }}
                    onValueComplete={verify}
                    className="justify-center gap-2 mobile:gap-[6px]"
                  >
                    {Array.from({ length: CODE_LENGTH }, (_, i) => (
                      <OTPField.Input
                        key={i}
                        aria-label={i === 0 ? undefined : `Digit ${i + 1} of ${CODE_LENGTH}`}
                        className="h-12 w-11 font-mono text-lg font-normal mobile:h-11 mobile:w-10"
                      />
                    ))}
                  </OTPField.Root>
                </Field.Root>
                <div className="mt-6">
                  <SubmitButton pending={pending} pendingLabel="Verifying…">
                    Verify and sign in
                  </SubmitButton>
                </div>
              </form>

              <div className="mt-5 flex items-center justify-center gap-1 text-xs text-muted">
                Didn’t get it?
                {cooldown > 0 ? (
                  <span className="font-mono text-faint">Resend in 0:{String(cooldown).padStart(2, '0')}</span>
                ) : (
                  <button type="button" onClick={() => sendCode()} className="font-semibold text-blue hover:underline">
                    Resend code
                  </button>
                )}
              </div>
              <Button variant="ghost" className="mt-3" onClick={() => setStep('email')}>
                <Icon name="arrowLeft" size="sm" />
                Use a different email
              </Button>
              <p className="mb-0 mt-6 text-[11px] text-faint">
                Demo: any 6 digits work; <span className="font-mono">000000</span> shows the error state. Pasting a code fills every box.
              </p>
            </>
          )}

          {step === 'done' && (
            <>
              <StepTile icon="check" tone="green" />
              <h1 className="m-0 text-[22px] font-[650] tracking-[-.04em]">You’re signed in</h1>
              <p className="mb-6 mt-[6px] text-[13px] leading-relaxed text-muted">
                Welcome back, <strong className="font-semibold text-strong">{email}</strong>. This device is remembered for 30 days.
              </p>
              <Button variant="primary" className="h-[38px]! w-full justify-center" onClick={() => navigate('/examples/crm/overview')}>
                Continue to workspace <Icon name="arrowRight" size="sm" />
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
