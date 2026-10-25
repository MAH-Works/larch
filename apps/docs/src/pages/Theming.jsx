import { Link } from 'react-router-dom';
import { Button, Icon, useTheme } from '@larch/ui';
import { C, CodeBlock } from '../docs/CodeBlock.jsx';
import { PropsTable } from '../docs/PropsTable.jsx';
import { DocHeader, Prose } from '../docs/Prose.jsx';

const Code = ({ children }) => <CodeBlock className="my-4" code={children} />;

export default function Theming() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="mx-auto w-full max-w-[900px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader eyebrow="Getting started" title="Theming & dark mode" description="Every component reads semantic CSS variables. Light values live on :root; dark values on :root[data-theme='dark'].">
        <div className="mt-5 flex items-center gap-3">
          <Button variant="primary" onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="sm" />
            Switch to {theme === 'dark' ? 'light' : 'dark'}
          </Button>
          <span className="text-xs text-muted">
            Current theme: <strong className="text-ink">{theme}</strong>
          </span>
        </div>
      </DocHeader>

      <Prose>
        <h2>How it works</h2>
        <p>
          <C>theme.css</C> maps names like <C>surface</C>, <C>ink</C> and <C>line</C> to <C>var(--surface)</C>,
          <C>var(--ink)</C>… with <C>@theme inline</C>, and declares{' '}
          <C>{"@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *))"}</C>. So <C>bg-surface</C> re-themes
          itself, and the few hand-tuned hues (badges, alerts) use explicit <C>dark:</C> variants.
        </p>

        <h2>ThemeProvider</h2>
        <p>
          Mirrors the theme onto <C>{'<html data-theme>'}</C>, follows the OS preference until the user chooses, and persists the
          choice in <C>localStorage</C>.
        </p>
      </Prose>
      <Code>{`import { ThemeProvider, useTheme, useToast } from '@larch/ui';

function Root() {
  const { showToast } = useToast();
  return (
    <ThemeProvider onChange={(t) => showToast(\`\${t === 'dark' ? 'Dark' : 'Light'} mode enabled\`)}>
      <App />
    </ThemeProvider>
  );
}

function ThemeButton() {
  const { isDark, toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>{isDark ? 'Light' : 'Dark'} mode</Button>;
}`}</Code>
      <PropsTable
        name="ThemeProvider"
        props={[
          ['storageKey', 'string', "'larch-theme'", 'localStorage key for the explicit choice.'],
          ['defaultTheme', "'light' | 'dark'", 'OS preference', 'Used when nothing is stored.'],
          ['onChange', '(theme) => void', '', 'Fires on explicit changes (not OS changes).'],
        ]}
      />
      <PropsTable
        name="useTheme()"
        props={[
          ['theme', "'light' | 'dark'", '', 'Current theme.'],
          ['isDark', 'boolean', '', 'Shorthand.'],
          ['setTheme', '(theme) => void', '', 'Set and persist.'],
          ['toggleTheme', '() => void', '', 'Flip and persist.'],
        ]}
      />

      <Prose>
        <h2>Avoiding a flash on load</h2>
        <p>
          Set the attribute before React mounts. Paste this into <C>{'<head>'}</C>, or render <C>themeScript()</C> from your SSR
          template:
        </p>
      </Prose>
      <Code>{`<script>
  try {
    document.documentElement.dataset.theme =
      localStorage.getItem('larch-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
</script>`}</Code>

      <Prose>
        <h2>Customising the palette</h2>
        <p>
          Override any token after importing <C>theme.css</C> (or <C>tokens.css</C>). For example, a green accent instead of blue:
        </p>
      </Prose>
      <Code>{`:root {
  --blue: #12805c;
  --blue-hover: #0f6e4f;
  --blue-border: #0e6649;
  --blue-soft: #e7f6ef;
}
:root[data-theme='dark'] {
  --blue: #4cc596;
  --blue-hover: #63d1a6;
  --blue-border: #39a87d;
  --blue-soft: #15372b;
}`}</Code>
      <Prose>
        <p>
          See every variable on the <Link to="/docs/tokens">design tokens</Link> page.
        </p>
      </Prose>
    </div>
  );
}
