# Larch UI

Quiet, dense React + Tailwind CSS v4 components for client-operations dashboards, extracted from the
Compass CRM prototype. It ships primitives, composed blocks, design tokens with
built-in dark mode, a documentation site with live examples, and a complete example app.

**Docs:** https://mah-works.github.io/larch/

```bash
pnpm install
pnpm dev          # docs at http://localhost:5173
pnpm build        # builds the library, then the docs
pnpm build:ui     # library only → packages/ui/dist
```

## Repository layout

```
packages/ui/                 @larch/ui — the library
  src/components/            primitives: Button, Badge, Avatar, Card/Panel, MetricCard, Progress, Form,
                             Checkbox, Switch, Alert, Tooltip, Dropdown, Tabs, Dialog, Table, Page…
  src/blocks/                composed sections: AppShell, Sidebar, Topbar, ClientsTable,
                             SelectionToolbar, ProjectCard, HealthChart/BarChart, ActivityList, lists
  src/theme/                 ThemeProvider (light/dark, persisted, cross-tab), ToastProvider
  src/hooks/                 useSelection, useHotkey, useDismiss
  src/tokens.css             design tokens (CSS variables, light + [data-theme="dark"]) + base layer
  src/theme.css              Tailwind v4 theme: @theme colors/shadows/animation, @custom-variant
                             dark · narrow · tablet · mobile, @source for the components
  src/styles.css             entry for the prebuilt dist/styles.css (Tailwind CLI)

apps/docs/                   documentation site (Vite + React Router)
  src/pages/                 guides: introduction, installation, theming, tokens, hooks
  src/docs/registry.js       every component/block: description, imports, props tables
  src/examples/components/   one folder per component, one file per live example
  src/examples/blocks/       one folder per block, one file per live example
  src/crm/                   the Compass CRM rebuilt from @larch/ui (8 example pages)
  src/auth/                  3 auth page variants + shared PasswordInput, CodeInput, SocialButtons
```

## Docs site

| Route | What |
| --- | --- |
| `/` | Introduction, quick start, inventory |
| `/docs/installation` · `/docs/theming` · `/docs/tokens` · `/docs/hooks` | Guides |
| `/components/:slug` | 25 component pages — live preview, source, API reference |
| `/blocks/:slug` | 12 block pages — app shell, stats, charts, tables, forms, dialogs… |
| `/examples` | Gallery of example pages |
| `/examples/crm/*` | Overview, Clients, Contacts, Projects, Acme accounts, Renewals, Reports, Design system |
| `/examples/auth/*` | Auth variants: `sign-in` (centered card), `sign-up` (split screen), `passwordless` (email code) |
| `/preview/:kind/:slug/:id` | Any single example, full-screen (used by iframe previews) |

The docs alias `@larch/ui` to the library **source**, so library edits hot-reload in the docs.

### Adding an example

Drop a file in `apps/docs/src/examples/<components|blocks>/<slug>/NN-name.jsx`:

```jsx
import { Button } from '@larch/ui';

export const title = 'Sizes';
export const description = 'Optional — `backticks` render as code.';
export const layout = 'center'; // center | padded | canvas | full | frame (iframe)

export default function Sizes() {
  return <Button>Hello</Button>;
}
```

The page picks it up automatically (ordered by `NN-`). The `Code` tab shows the file minus the
metadata exports. A new component or block also needs an entry in `src/docs/registry.js`.

## Using the library in another app

See `packages/ui/README.md` or the Installation page in the docs.
