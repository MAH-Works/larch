# Larch UI

A design system built on [Base UI](https://base-ui.com): Base UI's components, parts and APIs, styled
with Larch's tokens and Tailwind CSS v4 for quiet, dense client-operations dashboards. It also ships
Larch-only components, composed blocks, design tokens with built-in dark mode, a documentation site
with live examples, and complete example apps.

**Docs:** https://mah-works.github.io/larch/

```bash
pnpm install
pnpm dev          # docs at http://localhost:5173
pnpm build        # builds the library, then the docs
pnpm build:ui     # library only → packages/ui/dist
```

## Repository layout

```
packages/ui/                 @mah-works/larch — the library
  src/base-ui/                one module per Base UI component, named after its @base-ui/react entry
                             (dialog.js, select.jsx…); styled.js wraps parts, classes.js holds shared looks
  src/components/            Larch-only components: Badge, Card/Panel, MetricCard, ProgressRow, Alert,
                             Table, Page, Icon, AvatarStack…
  src/blocks/                composed sections: AppShell, Sidebar, Topbar, ClientsTable,
                             SelectionToolbar, ProjectCard, HealthChart/BarChart, ActivityList, lists, Toaster
  src/theme/                 ThemeProvider (light/dark, persisted, cross-tab)
  src/hooks/                 useSelection, useHotkey, useDismiss
  src/tokens.css             design tokens (CSS variables, light + [data-theme="dark"]) + base layer
  src/theme.css              Tailwind v4 theme: @theme colors/shadows/animation, @custom-variant
                             dark · narrow · tablet · mobile, @source for the components
  src/styles.css             entry for the prebuilt dist/styles.css (Tailwind CLI)

apps/docs/                   documentation site (Vite + React Router)
  src/pages/                 guides: introduction, installation, base-ui, theming, tokens, hooks
  src/docs/registry.js       every component/block: description, imports, props tables
  src/examples/components/   one folder per component, one file per live example
  src/examples/blocks/       one folder per block, one file per live example
  src/crm/                   the Compass CRM rebuilt from @mah-works/larch (8 example pages)
  src/auth/                  3 auth page variants + shared PasswordInput, CodeInput, SocialButtons
```

## Docs site

| Route | What |
| --- | --- |
| `/` | Introduction, quick start, inventory |
| `/docs/installation` · `/docs/base-ui` · `/docs/theming` · `/docs/tokens` · `/docs/hooks` | Guides |
| `/components/:slug` | 37 Base UI component pages (Base UI's catalog) + 15 Larch component pages |
| `/blocks/:slug` | 12 block pages — app shell, stats, charts, tables, forms, dialogs… |
| `/examples` | Gallery of example pages |
| `/examples/crm/*` | Overview, Clients, Contacts, Projects, Acme accounts, Renewals, Reports, Design system |
| `/examples/auth/*` | Auth variants: `sign-in` (centered card), `sign-up` (split screen), `passwordless` (email code) |
| `/preview/:kind/:slug/:id` | Any single example, full-screen (used by iframe previews) |

The docs alias `@mah-works/larch` (and `@mah-works/larch/<component>`) to the library **source**, so library edits hot-reload in the docs.

### Adding an example

Drop a file in `apps/docs/src/examples/<components|blocks>/<slug>/NN-name.jsx`:

```jsx
import { Button } from '@mah-works/larch/button'; // Base UI components: mirror the @base-ui/react subpath

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
