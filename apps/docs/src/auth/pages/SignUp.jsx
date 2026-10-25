import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AccountItem,
  Avatar,
  Card,
  CheckRow,
  Field,
  MetricCard,
  Panel,
  ProgressBar,
  SelectInput,
  TextInput,
  useToast,
} from '@compass/ui';
import { AuthTopbar, EMAIL_RE, OrDivider, PasswordInput, SocialButtons, SubmitButton, useFakeRequest } from '../shared.jsx';

const STRENGTH = [
  { label: 'Too short', tone: 'red', percent: 8 },
  { label: 'Weak', tone: 'red', percent: 25 },
  { label: 'Fair', tone: 'amber', percent: 50 },
  { label: 'Good', tone: 'blue', percent: 75 },
  { label: 'Strong', tone: 'green', percent: 100 },
];

/** 0 = too short, 1–4 = one point each for length ≥ 12, mixed case, digits, symbols (min 1 once ≥ 8 chars). */
function scorePassword(pw) {
  if (pw.length < 8) return 0;
  const points = [pw.length >= 12, /[a-z]/.test(pw) && /[A-Z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)];
  return Math.max(1, points.filter(Boolean).length);
}

function ProductPanel() {
  return (
    <aside className="relative flex flex-col justify-center gap-5 overflow-hidden border-l border-line bg-sidebar px-14 py-12 narrow:hidden">
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[.13em] text-label">Trusted by 1,200+ client teams</p>

      <blockquote className="m-0 max-w-[480px]">
        <p className="m-0 text-[19px] font-[600] leading-[1.45] tracking-[-.025em] text-ink">
          “We replaced three spreadsheets and a weekly status meeting. Renewals stopped sneaking up on us.”
        </p>
        <footer className="mt-4 flex items-center gap-3">
          <Avatar size="lg" initials="MC" tone="coral" />
          <span className="text-xs">
            <strong className="block font-semibold text-strong">Maria Costa</strong>
            <span className="text-muted">Founder, Parallax Studio</span>
          </span>
        </footer>
      </blockquote>

      <div className="grid max-w-[480px] grid-cols-2 gap-[14px]">
        <MetricCard label="Renewals won" value="94.8%" meta={[{ text: '↗ 2.1%', trend: 'up' }, { text: 'retention' }]} />
        <MetricCard label="Time saved" value="6.5h" meta={[{ text: 'per manager / week' }]} />
      </div>

      <div className="max-w-[480px]">
        <Panel title="Upcoming renewals" subtitle="What your dashboard will look like">
          <AccountItem name="Aperture Labs" mark="sky" meta="Renews in 4 days" badge={['Healthy', 'active']} value="$24.8k" />
          <AccountItem name="Harbor & Co." mark="rose" meta="Renews in 16 days" badge={['Watch', 'priority']} value="$38.9k" />
        </Panel>
      </div>
    </aside>
  );
}

/** Variant 2 — split screen: sign-up form with strength meter beside a product / social-proof panel. */
export default function SignUp() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pending, request] = useFakeRequest(1100);
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '', size: '2–10', terms: false });
  const [submitted, setSubmitted] = useState(false);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const score = scorePassword(form.password);
  const errors = {
    name: !form.name.trim() ? 'Tell us your name.' : null,
    email: !EMAIL_RE.test(form.email) ? 'Enter a valid work email.' : null,
    company: !form.company.trim() ? 'Name your workspace.' : null,
    password: score < 2 ? 'Use 8+ characters with a mix of letters, numbers or symbols.' : null,
    terms: !form.terms ? 'Please accept the terms to continue.' : null,
  };
  const show = (key) => (submitted ? errors[key] : null);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    request(() => {
      showToast(`Workspace “${form.company}” created`);
      navigate('/examples/crm/overview');
    });
  };

  const sso = (provider) => request(() => {
    showToast(`Signed up with ${provider}`);
    navigate('/examples/crm/overview');
  });

  const strength = STRENGTH[score];

  return (
    <div className="grid min-h-screen grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] bg-canvas text-ink narrow:grid-cols-1">
      <div className="flex flex-col px-[33px] py-6 tablet:px-5 mobile:px-[13px]">
        <AuthTopbar />

        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-[min(440px,100%)]">
            <p className="mb-2 mt-0 text-[11px] font-semibold uppercase tracking-[.13em] text-label">Free for 14 days · no card</p>
            <h1 className="m-0 text-[26px] font-[650] leading-[1.1] tracking-[-.045em] mobile:text-[22px]">Create your workspace</h1>
            <p className="mb-6 mt-[7px] text-[13px] text-muted">Bring clients, projects and renewals into one quiet place.</p>

            <SocialButtons onSelect={sso} columns={2} />
            <OrDivider>or sign up with email</OrDivider>

            <Card as="form" noValidate onSubmit={onSubmit} className="p-6 mobile:p-5">
              <div className="grid grid-cols-2 gap-x-3 gap-y-3 mobile:grid-cols-1 [&>*+*]:!mt-0">
                <Field label="Full name" id="su-name" error={show('name')}>
                  <TextInput id="su-name" autoComplete="name" placeholder="Jamie Chen" value={form.name} invalid={!!show('name')} onChange={set('name')} />
                </Field>
                <Field label="Work email" id="su-email" error={show('email')}>
                  <TextInput id="su-email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} invalid={!!show('email')} onChange={set('email')} />
                </Field>
                <Field label="Workspace name" id="su-company" error={show('company')}>
                  <TextInput id="su-company" autoComplete="organization" placeholder="Acme Studio" value={form.company} invalid={!!show('company')} onChange={set('company')} />
                </Field>
                <Field label="Team size" id="su-size">
                  <SelectInput id="su-size" value={form.size} onChange={set('size')}>
                    <option>Just me</option>
                    <option>2–10</option>
                    <option>11–50</option>
                    <option>51+</option>
                  </SelectInput>
                </Field>
                <Field label="Password" id="su-password" error={show('password')} className="col-span-2 mobile:col-span-1">
                  <PasswordInput
                    id="su-password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    invalid={!!show('password')}
                    onChange={set('password')}
                    aria-describedby="su-strength"
                  />
                  {form.password && (
                    <div id="su-strength" className="mt-1 flex items-center gap-3" aria-live="polite">
                      <ProgressBar percent={strength.percent} tone={strength.tone} label="Password strength" className="flex-1" />
                      <span className="w-[62px] text-right text-[11px] font-semibold text-muted">{strength.label}</span>
                    </div>
                  )}
                </Field>
              </div>

              <div className="mt-4">
                <CheckRow checked={form.terms} onChange={set('terms')}>
                  I agree to the Terms and Privacy Policy
                </CheckRow>
                {show('terms') && <span className="mt-1 block text-[10px] text-red">{show('terms')}</span>}
              </div>

              <div className="mt-5">
                <SubmitButton pending={pending} pendingLabel="Creating workspace…">
                  Create workspace
                </SubmitButton>
              </div>
            </Card>

            <p className="mb-0 mt-5 text-center text-xs text-muted">
              Already have an account?{' '}
              <Link to="/examples/auth/sign-in" className="font-semibold text-blue no-underline hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </main>
      </div>

      <ProductPanel />
    </div>
  );
}
