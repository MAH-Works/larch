import { createContext, use, useCallback, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', isDark: false, setTheme: () => {}, toggleTheme: () => {} });

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

const readStored = (key: string): Theme | null => {
  try {
    const value = localStorage.getItem(key);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
};

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

/**
 * Light/dark theme mirrored onto <html data-theme="…">. Follows the OS until the user picks a theme,
 * then persists the choice under `storageKey` (and syncs it across tabs). `onChange(theme)` fires on
 * explicit changes only.
 */
export interface ThemeProviderProps {
  children?: ReactNode;
  /** localStorage key for the explicit choice. */
  storageKey?: string;
  /** Used when nothing is stored (defaults to the OS preference). */
  defaultTheme?: Theme;
  /** Fires on explicit changes (not OS changes). */
  onChange?: (theme: Theme) => void;
}

export function ThemeProvider({ children, storageKey = 'larch-theme', defaultTheme, onChange }: ThemeProviderProps) {
  // The server can't see localStorage or the OS preference, so the first render (server and hydration)
  // uses the fallback theme and the real one is resolved after mount. That keeps SSR markup and the
  // hydrating client identical; <html data-theme> is already correct from themeScript, so nothing flashes.
  const fallback = defaultTheme || 'light';
  const [resolved, setThemeState] = useState<Theme | null>(null);
  const theme = resolved ?? fallback;

  // Layout effect: re-render with the real theme before the browser paints.
  useLayoutEffect(() => {
    setThemeState(readStored(storageKey) || defaultTheme || (systemPrefersDark() ? 'dark' : 'light'));
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    // Don't overwrite the attribute set by themeScript before the real theme is known.
    if (resolved) document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!readStored(storageKey)) setThemeState(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, [storageKey]);

  // Keep other tabs / iframes on the same origin in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey && isTheme(e.newValue)) setThemeState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        /* storage unavailable — theme still applies for this session */
      }
      onChange?.(next);
    },
    [storageKey, onChange],
  );

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  return (
    <ThemeContext value={{ theme, isDark: theme === 'dark', setTheme, toggleTheme }}>{children}</ThemeContext>
  );
}

export const useTheme = (): ThemeContextValue => use(ThemeContext);

// Re-exported for existing imports; the server-safe entry is '@mah-works/larch/theme-script'.
export { themeScript } from './script.js';
