import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand, Button, Icon, TextInput, useTheme } from '@larch/ui';

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Simulates a network request: `run(fn)` flips `pending` for `ms`, then calls fn. */
export function useFakeRequest(ms = 900) {
  const [pending, setPending] = useState(false);
  const timer = useRef();
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);
  const run = useCallback(
    (fn) => {
      setPending(true);
      timer.current = setTimeout(() => {
        setPending(false);
        fn();
      }, ms);
    },
    [ms],
  );
  return [pending, run];
}

export function Spinner() {
  return <span aria-hidden="true" className="size-[13px] animate-spin rounded-full border-[1.5px] border-current border-r-transparent" />;
}

/** Top strip shared by the auth pages: brand on the left, back link + theme toggle on the right. */
export function AuthTopbar({ brand = true }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <div className="flex items-center justify-between gap-3">
      {brand ? (
        <Link to="/examples/crm/overview" aria-label="Compass home" className="flex items-center gap-[10px] text-ink no-underline">
          <Brand />
        </Link>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2">
        <Button as={Link} to="/examples" variant="ghost">
          <Icon name="arrowLeft" size="sm" />
          <span className="mobile:hidden">All examples</span>
        </Button>
        <Button variant="icon" aria-label={label} title={label} onClick={toggleTheme}>
          <Icon name={isDark ? 'moon' : 'sun'} />
        </Button>
      </div>
    </div>
  );
}

/** Text input with a show/hide toggle. */
export const PasswordInput = forwardRef(function PasswordInput({ className = '', ...props }, ref) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <TextInput ref={ref} type={visible ? 'text' : 'password'} className={`pr-9 ${className}`} {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        className="absolute right-[6px] top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-[5px] text-faint hover:bg-hover hover:text-ink"
      >
        <Icon name={visible ? 'eyeOff' : 'eye'} size="sm" />
      </button>
    </div>
  );
});

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[15px]">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[15px] text-ink">
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

/** Google + GitHub single sign-on buttons. */
export function SocialButtons({ onSelect, columns = 1 }) {
  return (
    <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-2 mobile:grid-cols-1' : ''}`}>
      <Button className="h-[38px]! w-full justify-center" onClick={() => onSelect('Google')}>
        <GoogleMark />
        Continue with Google
      </Button>
      <Button className="h-[38px]! w-full justify-center" onClick={() => onSelect('GitHub')}>
        <GitHubMark />
        Continue with GitHub
      </Button>
    </div>
  );
}

/** Hairline with centered text, e.g. "or continue with email". */
export function OrDivider({ children }) {
  return (
    <div className="my-5 flex items-center gap-3 text-[11px] text-faint">
      <span className="h-px flex-1 bg-line" />
      {children}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Full-width submit with a pending state. */
export function SubmitButton({ pending, pendingLabel, children, ...props }) {
  return (
    <Button type="submit" variant="primary" className="h-[38px]! w-full justify-center" disabled={pending} {...props}>
      {pending && <Spinner />}
      {pending ? pendingLabel : children}
    </Button>
  );
}

const CELL = 'h-12 w-11 rounded-md border bg-surface text-center font-mono text-lg text-ink outline-hidden transition mobile:h-11 mobile:w-10';
const CELL_VALID = 'border-line-strong focus:border-blue focus:shadow-[0_0_0_3px_var(--blue-soft)]';
const CELL_INVALID = 'border-red focus:border-red focus:shadow-[0_0_0_3px_var(--red-soft)]';

/**
 * One-time-code input: one box per digit, auto-advance, backspace to the previous box,
 * and pasting a full code fills every box. `onComplete(code)` fires when all digits are filled.
 */
export function CodeInput({ length = 6, value, onChange, onComplete, invalid = false, disabled = false }) {
  const refs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const commit = (next) => {
    const code = next.join('').slice(0, length);
    onChange(code);
    if (code.length === length && !next.includes('')) onComplete?.(code);
  };

  const setAt = (i, char) => {
    const next = [...digits];
    next[i] = char;
    commit(next);
  };

  const onInput = (i, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    if (!char) return;
    setAt(i, char);
    refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (digits[i]) setAt(i, '');
      else if (i > 0) {
        setAt(i - 1, '');
        refs.current[i - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft') refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight') refs.current[i + 1]?.focus();
  };

  const onPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    commit(Array.from({ length }, (_, i) => pasted[i] ?? ''));
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 mobile:gap-[6px]" onPaste={onPaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          disabled={disabled}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          onChange={(e) => onInput(i, e)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className={`${CELL} ${invalid ? CELL_INVALID : CELL_VALID}`}
        />
      ))}
    </div>
  );
}

/** Small print under the forms. */
export function LegalNote() {
  return (
    <p className="m-0 text-center text-[11px] leading-relaxed text-faint">
      By continuing you agree to the{' '}
      <a href="#terms" className="text-muted underline-offset-2 hover:underline">
        Terms
      </a>{' '}
      and{' '}
      <a href="#privacy" className="text-muted underline-offset-2 hover:underline">
        Privacy Policy
      </a>
      .
    </p>
  );
}
