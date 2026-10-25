import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', isDark: false, setTheme: () => {}, toggleTheme: () => {} });

const readStored = (key) => {
  try {
    return localStorage.getItem(key);
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
export function ThemeProvider({ children, storageKey = 'compass-theme', defaultTheme, onChange }) {
  const [theme, setThemeState] = useState(
    () => readStored(storageKey) || defaultTheme || (systemPrefersDark() ? 'dark' : 'light'),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const onSystemChange = (e) => {
      if (!readStored(storageKey)) setThemeState(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, [storageKey]);

  // Keep other tabs / iframes on the same origin in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === storageKey && (e.newValue === 'light' || e.newValue === 'dark')) setThemeState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey]);

  const setTheme = useCallback(
    (next) => {
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
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

/**
 * Inline script for <head> that sets the theme before first paint (avoids a light/dark flash).
 * Render it in SSR output or paste its string into index.html.
 */
export const themeScript = (storageKey = 'compass-theme') =>
  `try{document.documentElement.dataset.theme=localStorage.getItem('${storageKey}')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}`;
