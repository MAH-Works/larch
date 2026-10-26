import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AccountItem,
  Avatar,
  Card,
  Checkbox,
  Field,
  Form,
  Input,
  Meter,
  MetricCard,
  Panel,
  Select,
  Toast,
} from '@mah-works/larch';
import { AuthTopbar, EMAIL_RE, OrDivider, PasswordInput, SocialButtons, SubmitButton, useFakeRequest } from '../shared.jsx';

const TEAM_SIZES = ['Just me', '2–10', '11–50', '51+'];

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
          <Avatar.Root size="lg" tone="coral">
            <Avatar.Fallback>MC</Avatar.Fallback>
          </Avatar.Root>
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
  const toastManager = Toast.useToastManager();
  const [pending, request] = useFakeRequest(1100);
  // Only the password is controlled (for the live strength meter); Base UI's Form validates the rest.
  const [password, setPassword] = useState('');
  const score = scorePassword(password);

  const onFormSubmit = ({ company }) =>
    request(() => {
      toastManager.add({ title: `Workspace “${company}” created` });
      navigate('/examples/crm/overview');
    });

  const sso = (provider) => request(() => {
    toastManager.add({ title: `Signed up with ${provider}` });
    navigate('/examples/crm/overview');
  });

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

            <Card as={Form} onFormSubmit={onFormSubmit} className="p-6 mobile:p-5">
              <div className="grid grid-cols-2 gap-x-3 gap-y-3 mobile:grid-cols-1 *:mt-0!">
                <Field.Root name="name" validate={(v) => (v.trim() ? null : 'Tell us your name.')}>
                  <Field.Label>Full name</Field.Label>
                  <Input autoComplete="name" placeholder="Jamie Chen" />
                  <Field.Error />
                </Field.Root>
                <Field.Root name="email" validate={(v) => (EMAIL_RE.test(v) ? null : 'Enter a valid work email.')}>
                  <Field.Label>Work email</Field.Label>
                  <Input inputMode="email" autoComplete="email" placeholder="you@company.com" />
                  <Field.Error />
                </Field.Root>
                <Field.Root name="company" validate={(v) => (v.trim() ? null : 'Name your workspace.')}>
                  <Field.Label>Workspace name</Field.Label>
                  <Input autoComplete="organization" placeholder="Acme Studio" />
                  <Field.Error />
                </Field.Root>
                <Field.Root name="size">
                  <Select.Root defaultValue="2–10">
                    <Select.Label>Team size</Select.Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.List>
                            {TEAM_SIZES.map((size) => (
                              <Select.Item key={size} value={size}>
                                <Select.ItemText>{size}</Select.ItemText>
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.List>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root
                  name="password"
                  validate={(v) => (scorePassword(v) < 2 ? 'Use 8+ characters with a mix of letters, numbers or symbols.' : null)}
                  className="col-span-2 mobile:col-span-1"
                >
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onValueChange={setPassword}
                  />
                  {password && (
                    <Meter.Root value={STRENGTH[score].percent} getAriaValueText={() => STRENGTH[score].label} className="mt-1 grid-cols-[1fr_62px]">
                      <Meter.Label className="sr-only">Password strength</Meter.Label>
                      <Meter.Track className="col-span-1">
                        <Meter.Indicator tone={STRENGTH[score].tone} />
                      </Meter.Track>
                      <Meter.Value className="text-muted">{() => STRENGTH[score].label}</Meter.Value>
                    </Meter.Root>
                  )}
                  <Field.Error />
                </Field.Root>
              </div>

              <Field.Root name="terms" className="mt-4">
                <Field.Label className="flex items-center gap-2 text-xs font-normal text-[#656b74] dark:text-muted">
                  <Checkbox.Root required>
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  I agree to the Terms and Privacy Policy
                </Field.Label>
                <Field.Error match="valueMissing">Please accept the terms to continue.</Field.Error>
              </Field.Root>

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
