import { Alert } from '@mah-works/larch';
import { C, CodeBlock } from '../docs/CodeBlock.js';
import { DocHeader, Prose } from '../docs/Prose.js';

const Code = ({ children }: { children: string }) => <CodeBlock className="my-4" code={children} />;

export default function Installation() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader eyebrow="Getting started" title="Installation" description="Larch needs React 19 and Base UI, ships TypeScript types, and is built for Tailwind CSS v4. Apps without Tailwind can use the prebuilt stylesheet instead." />
      <Prose>
        <h2>1. Install the package</h2>
        <p>
          Base UI is a peer dependency, so your app and Larch share one copy — you can mix Larch’s styled parts with Base UI
          utilities (<C>mergeProps</C>, <C>useRender</C>, <C>DirectionProvider</C>) and unstyled parts freely. Inside this
          monorepo the docs app already depends on Larch via <C>workspace:*</C>. In another project:
        </p>
      </Prose>
      <Code>{`pnpm add @mah-works/larch @base-ui/react
# or: npm install @mah-works/larch @base-ui/react`}</Code>

      <Prose>
        <h2>2a. With Tailwind CSS v4 (recommended)</h2>
        <p>
          Larch is configured in CSS — there is no <C>tailwind.config.js</C>. Add Tailwind's Vite plugin (or{' '}
          <C>@tailwindcss/postcss</C> / <C>@tailwindcss/cli</C> for other setups):
        </p>
      </Prose>
      <Code>{`pnpm add -D tailwindcss @tailwindcss/vite`}</Code>
      <Code>{`// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}</Code>
      <Prose>
        <p>
          Then import Tailwind and the Larch theme in your stylesheet. <C>theme.css</C> registers the tokens, the semantic
          colors (<C>bg-surface</C>, <C>text-ink</C>, <C>border-line</C>…) via <C>@theme</C>, the <C>narrow</C> /{' '}
          <C>tablet</C> / <C>mobile</C> max-width variants and the <C>data-theme</C> dark variant via <C>@custom-variant</C>,
          and an <C>@source</C> for the Larch components — so their classes are generated without any content globs.
        </p>
      </Prose>
      <Code>{`/* src/index.css */
@import 'tailwindcss';
@import '@mah-works/larch/theme.css';`}</Code>

      <Prose>
        <h2>2b. Without Tailwind</h2>
        <p>
          Import the prebuilt stylesheet. It contains the tokens, Tailwind's preflight and every utility the components use.
          You can't use Larch utility classes in your own markup this way, but every component renders correctly.
        </p>
      </Prose>
      <Code>{`import '@mah-works/larch/styles.css';`}</Code>

      <Prose>
        <h2>3. Fonts</h2>
        <p>Larch is designed around Inter, with DM Mono for numerics. Load them however you like, e.g. from Google Fonts:</p>
      </Prose>
      <Code>{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />`}</Code>

      <Prose>
        <h2>4. Providers and the app root</h2>
        <p>
          Wrap your app in Base UI’s <C>Toast.Provider</C> and render Larch’s <C>Toaster</C> once (for
          <C>Toast.useToastManager()</C>), and in <C>ThemeProvider</C> (for dark mode and the topbar theme toggle). Both are
          optional — components that don’t need them work without.
        </p>
        <p>
          As Base UI’s quick start recommends, give the app root <C>isolation: isolate</C> so portalled popups always stack above
          the page. (The <C>body {'{'} position: relative {'}'}</C> rule Base UI needs for iOS backdrops ships in Larch’s base layer.)
        </p>
      </Prose>
      <Code>{`import { ThemeProvider, Toast, Toaster } from '@mah-works/larch';

createRoot(document.getElementById('root')).render(
  <Toast.Provider>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </Toast.Provider>,
);

/* index.css */
#root { isolation: isolate; }`}</Code>

      <Prose>
        <h2>5. Use the components</h2>
        <p>
          Every Base UI component keeps its name, parts and props. Import it from the matching Larch subpath — or from the
          package root — and copy examples straight from the Base UI docs:
        </p>
      </Prose>
      <Code>{`- import { Dialog } from '@base-ui/react/dialog';
+ import { Dialog } from '@mah-works/larch/dialog';
// or: import { Dialog } from '@mah-works/larch';`}</Code>

      <Prose>
        <h2>6. Routing</h2>
        <p>
          The library has no router dependency. Base UI parts compose with your router through Base UI’s <C>render</C> prop
          (add <C>nativeButton={'{false}'}</C> when a Button renders a link). Larch’s own <C>Card</C> and <C>PanelLink</C> take an
          <C>as</C> prop, and the <C>Sidebar</C> takes a <C>linkComponent</C> that receives <C>href</C>. With react-router:
        </p>
      </Prose>
      <Code>{`import type { ComponentProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppShell, Button } from '@mah-works/larch';

// React 19: ref is a plain prop, so no forwardRef is needed.
function RouterLink({ href, ...props }: Omit<ComponentProps<typeof Link>, 'to'> & { href: string }) {
  return <Link to={href} {...props} />;
}

function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <AppShell sidebar={{ sections, activeHref: pathname, linkComponent: RouterLink }} topbar={{ title: 'Clients' }}>
      {children}
    </AppShell>
  );
}

<Button render={<Link to="/clients" />} nativeButton={false} variant="primary">Open clients</Button>`}</Code>

      <Alert tone="info" title="Building the package">
        Run <C>pnpm build:ui</C> at the repo root. Output lands in <C>packages/ui/dist</C>: ESM + CJS modules (one per component, so
        bundlers tree-shake), the Tailwind v4 <C>theme.css</C>, raw <C>tokens.css</C> and the prebuilt <C>styles.css</C>.
      </Alert>
    </div>
  );
}
