import { Link } from 'react-router-dom';
import { Badge, Button, Card, Icon, MetricGrid } from '@mah-works/larch';
import { CodeBlock } from '../docs/CodeBlock.jsx';
import { DocHeader, Prose } from '../docs/Prose.jsx';
import { BLOCKS, COMPONENTS, COMPONENT_GROUPS } from '../docs/registry.js';
import { CRM_PAGES } from '../crm/routes.js';
import { AUTH_PAGES } from '../auth/routes.js';

const QUICK = `/* src/index.css → @import 'tailwindcss'; @import '@mah-works/larch/theme.css'; */
import { Dialog } from '@mah-works/larch/dialog'; // same API as '@base-ui/react/dialog'
import { MetricGrid, PageHeading, PageWrap, ThemeProvider } from '@mah-works/larch';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <PageWrap>
        <PageHeading eyebrow="Workspace" title="Overview" description="Here is what is happening.">
          <Dialog.Root>
            <Dialog.Trigger variant="primary">Invite teammate</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Title>Invite a teammate</Dialog.Title>
                <Dialog.Description>They'll get access to every client.</Dialog.Description>
                <Dialog.Close>Close</Dialog.Close>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </PageHeading>
        <MetricGrid items={[{ label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }] }]} />
      </PageWrap>
    </ThemeProvider>
  );
}`;

const PRINCIPLES = [
  ['Base UI underneath', 'Every interactive component is Base UI — same names, parts and props. Copy an example from base-ui.com, change the import, and it renders in Larch’s style.'],
  ['Neutrals carry the interface', 'Color is reserved for meaning — status, selection and danger. Everything else is a quiet grey.'],
  ['Dense, not cramped', '12px body text, 54–60px table rows and hairline dividers fit more data on screen without noise.'],
  ['One switch for dark mode', 'Semantic tokens are CSS variables. Flip <html data-theme="dark"> and every component re-themes.'],
];

export default function Introduction() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader
        eyebrow="Larch UI · v2.0"
        title="Quiet, dense interface primitives for client operations."
        description="Larch is a design system built on Base UI: Base UI’s components and APIs, styled with Larch’s tokens and Tailwind CSS v4. It also ships Larch-only components, composed blocks, built-in dark mode and complete example pages."
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <Button render={<Link to="/docs/installation" />} nativeButton={false} variant="primary">
            Get started <Icon name="arrowRight" size="sm" />
          </Button>
          <Button render={<Link to="/docs/base-ui" />} nativeButton={false}>
            How Larch uses Base UI
          </Button>
          <Button render={<Link to="/examples/crm/overview" />} nativeButton={false} variant="ghost">
            <Icon name="window" size="sm" /> Live CRM example
          </Button>
        </div>
      </DocHeader>

      <MetricGrid
        items={[
          { label: 'Base UI components', value: String(COMPONENTS.filter((c) => c.base).length), meta: [{ text: 'the full catalog' }] },
          { label: 'Blocks', value: String(BLOCKS.length), meta: [{ text: 'App shell, tables, charts…' }] },
          { label: 'Example pages', value: String(CRM_PAGES.length + AUTH_PAGES.length), meta: [{ text: 'A CRM + 3 auth flows' }] },
          { label: 'Larch components', value: String(COMPONENTS.filter((c) => !c.base).length), meta: [{ text: 'cards, tables, badges…' }] },
        ]}
      />

      <div className="mt-8 grid grid-cols-2 gap-4 mobile:grid-cols-1">
        {PRINCIPLES.map(([title, text]) => (
          <Card key={title} className="p-5">
            <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">{title}</h2>
            <p className="mb-0 mt-2 text-xs leading-relaxed text-muted">{text}</p>
          </Card>
        ))}
      </div>

      <Prose className="mt-10">
        <h2>Quick start</h2>
        <p>
          Install the package, then import Tailwind and the Larch theme once in your CSS. The full setup — including the prebuilt CSS
          option for apps without Tailwind — is on the <Link to="/docs/installation">installation</Link> page.
        </p>
      </Prose>
      <CodeBlock className="my-4" code={QUICK} />

      <Prose className="mt-10">
        <h2>What's inside</h2>
      </Prose>
      <div className="mt-4 grid grid-cols-3 gap-4 narrow:grid-cols-2 mobile:grid-cols-1">
        {COMPONENT_GROUPS.map((group) => (
          <Card key={group} className="p-5">
            <h3 className="m-0 mb-3 text-[13px] font-[650] text-ink">{group}</h3>
            <div className="flex flex-wrap gap-[6px]">
              {COMPONENTS.filter((c) => c.group === group).map((c) => (
                <Link key={c.slug} to={`/components/${c.slug}`} className="no-underline">
                  <Badge variant="inactive" className="hover:bg-hover hover:text-ink">
                    {c.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </Card>
        ))}
        <Card className="p-5">
          <h3 className="m-0 mb-3 text-[13px] font-[650] text-ink">Blocks</h3>
          <div className="flex flex-wrap gap-[6px]">
            {BLOCKS.map((b) => (
              <Link key={b.slug} to={`/blocks/${b.slug}`} className="no-underline">
                <Badge variant="blue">{b.name}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
