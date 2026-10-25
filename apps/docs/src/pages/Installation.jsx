import { Alert } from '@compass/ui';
import { C, CodeBlock } from '../docs/CodeBlock.jsx';
import { DocHeader, Prose } from '../docs/Prose.jsx';

const Code = ({ children }) => <CodeBlock className="my-4" code={children} />;

export default function Installation() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader eyebrow="Getting started" title="Installation" description="Compass UI needs React 18+ and works best with Tailwind CSS 3. Apps without Tailwind can use the prebuilt stylesheet instead." />
      <Prose>
        <h2>1. Install the package</h2>
        <p>Inside this monorepo the docs app already depends on it via <C>workspace:*</C>. In another project:</p>
      </Prose>
      <Code>{`pnpm add @compass/ui
# or: npm install @compass/ui`}</Code>

      <Prose>
        <h2>2a. With Tailwind (recommended)</h2>
        <p>
          Add the preset — it registers the semantic colors (<C>bg-surface</C>, <C>text-ink</C>, <C>border-line</C>…), the
          <C>narrow</C> / <C>tablet</C> / <C>mobile</C> max-width breakpoints, shadows and the <C>data-theme</C> dark-mode
          selector. Include the package in <C>content</C> so its classes are generated.
        </p>
      </Prose>
      <Code>{`// tailwind.config.js
import compass from '@compass/ui/tailwind-preset';

export default {
  presets: [compass],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@compass/ui/dist/**/*.js',
  ],
};`}</Code>
      <Prose>
        <p>Then import the tokens before Tailwind's layers:</p>
      </Prose>
      <Code>{`/* src/index.css */
@import '@compass/ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;`}</Code>

      <Prose>
        <h2>2b. Without Tailwind</h2>
        <p>
          Import the prebuilt stylesheet. It contains the tokens, Tailwind's preflight and every utility the components use.
          You can't use Compass utility classes in your own markup this way, but every component renders correctly.
        </p>
      </Prose>
      <Code>{`import '@compass/ui/styles.css';`}</Code>

      <Prose>
        <h2>3. Fonts</h2>
        <p>Compass is designed around Inter, with DM Mono for numerics. Load them however you like, e.g. from Google Fonts:</p>
      </Prose>
      <Code>{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />`}</Code>

      <Prose>
        <h2>4. Providers</h2>
        <p>
          Wrap your app in <C>ToastProvider</C> (for <C>useToast</C>) and <C>ThemeProvider</C> (for dark mode and the topbar
          theme toggle). Both are optional — components that don't need them work without.
        </p>
      </Prose>
      <Code>{`import { ThemeProvider, ToastProvider } from '@compass/ui';

createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ToastProvider>,
);`}</Code>

      <Prose>
        <h2>5. Routing</h2>
        <p>
          The library has no router dependency. Polymorphic components (<C>Button</C>, <C>Card</C>, <C>PanelLink</C>) take an
          <C>as</C> prop, and the <C>Sidebar</C> takes a <C>linkComponent</C> that receives <C>href</C>. With react-router:
        </p>
      </Prose>
      <Code>{`import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppShell, Button } from '@compass/ui';

const RouterLink = forwardRef(({ href, ...props }, ref) => <Link ref={ref} to={href} {...props} />);

function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <AppShell sidebar={{ sections, activeHref: pathname, linkComponent: RouterLink }} topbar={{ title: 'Clients' }}>
      {children}
    </AppShell>
  );
}

<Button as={Link} to="/clients" variant="primary">Open clients</Button>`}</Code>

      <Alert tone="info" title="Building the package">
        Run <C>pnpm build:ui</C> at the repo root. Output lands in <C>packages/ui/dist</C>: ESM + CJS modules (one per component, so
        bundlers tree-shake), the Tailwind preset, <C>tokens.css</C> and the prebuilt <C>styles.css</C>.
      </Alert>
    </div>
  );
}
