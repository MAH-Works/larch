/**
 * Compass Tailwind preset.
 *
 *   // tailwind.config.js
 *   import compass from '@compass/ui/tailwind-preset';
 *   export default {
 *     presets: [compass],
 *     content: ['./src/**\/*.{js,jsx,ts,tsx}', './node_modules/@compass/ui/dist/**\/*.js'],
 *   };
 *
 * Semantic colors resolve to CSS variables from `@compass/ui/tokens.css`, so switching
 * <html data-theme="dark"> re-themes every component.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: [],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Max-width breakpoints (declared widest → narrowest).
      screens: {
        narrow: { max: '980px' },
        tablet: { max: '900px' },
        mobile: { max: '680px' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        sidebar: 'var(--sidebar)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        soft: 'var(--soft)',
        label: 'var(--label)',
        faint: 'var(--faint)',
        body: 'var(--body)',
        strong: 'var(--strong)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        'line-soft': 'var(--line-soft)',
        head: 'var(--head)',
        hover: 'var(--hover)',
        selected: 'var(--selected)',
        'selected-hover': 'var(--selected-hover)',
        'row-hover': 'var(--row-hover)',
        blue: {
          DEFAULT: 'var(--blue)',
          hover: 'var(--blue-hover)',
          border: 'var(--blue-border)',
          soft: 'var(--blue-soft)',
        },
        green: { DEFAULT: 'var(--green)' },
        red: { DEFAULT: 'var(--red)', soft: 'var(--red-soft)' },
        amber: { DEFAULT: 'var(--amber)' },
        violet: { DEFAULT: 'var(--violet)' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(25,34,49,.02)',
        pop: '0 12px 26px rgba(25,34,49,.14)',
        dialog: '0 22px 60px rgba(16,21,29,.25)',
        toast: '0 8px 25px rgba(22,28,39,.2)',
      },
      keyframes: {
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: { shimmer: 'shimmer 1.5s ease-in-out infinite' },
    },
  },
  plugins: [],
};
