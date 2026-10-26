# @mah-works/larch

Base UI, themed for quiet, dense client-operations dashboards (React 19 + Tailwind CSS v4, TypeScript).

Every [Base UI](https://base-ui.com/react/overview/introduction) component keeps its name, parts and
props; Larch supplies the styles. Copy an example from the Base UI docs, change the import, done.

## Install

Larch is published to GitHub Packages. Point the `@mah-works` scope at it in your project's `.npmrc`
(and authenticate with a GitHub token that has `read:packages`):

```ini
@mah-works:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @mah-works/larch @base-ui/react   # peers: @base-ui/react ^1.9, react >= 19, react-dom >= 19
```

### With Tailwind CSS v4 (recommended)

No `tailwind.config.js` — Larch is configured in CSS. With Vite:

```bash
pnpm add -D tailwindcss @tailwindcss/vite   # add tailwindcss() to vite.config plugins
```

```css
/* src/index.css */
@import 'tailwindcss';
@import '@mah-works/larch/theme.css';
```

`theme.css` brings the tokens, the semantic colors (`@theme inline`), shadows and the shimmer
animation (`@theme`), the `dark` / `narrow` / `tablet` / `mobile` variants (`@custom-variant`) and an
`@source` for the compiled components, so their classes are detected automatically.

### Without Tailwind

```js
import '@mah-works/larch/styles.css'; // tokens + preflight + every utility the components use
```

Load Inter (UI) and DM Mono (numerics), e.g. from Google Fonts.

### Next.js (App Router) and other RSC frameworks

Every module is built with `'use client'`, so Server Components can render Larch components
directly. Keep `ThemeProvider`, `Toast.Provider` and `<Toaster />` in a client providers file, and
inline the theme script from its server-safe entry in the root layout:

```tsx
import { themeScript } from '@mah-works/larch/theme-script';

<html suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
  </head>
  …
</html>
```

Values exported from a client module (`ICON_NAMES`, `BUTTON_VARIANTS`…) are client references on the
server; use them in client components.

## Use

```tsx
- import { Dialog } from '@base-ui/react/dialog';
+ import { Dialog } from '@mah-works/larch/dialog';   // or from '@mah-works/larch'

<Dialog.Root>
  <Dialog.Trigger variant="primary">Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Share view</Dialog.Title>
      <Dialog.Description>Anyone on the workspace can open it.</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

- Styled parts merge your `className` after Larch's defaults (tailwind-merge), so overrides win.
  `className={(state) => …}`, `render`, data attributes and CSS variables work exactly as in Base UI.
- Larch adds visual props only: `variant` on Button and button-like triggers/closes, `tone`/`size` on
  Avatar.Root, `tone` on Progress/Meter/Slider indicators, and default glyphs for empty icon parts.
- Parts with no element of their own (Root, Portal, Provider) and helpers (`createHandle`,
  `useToastManager`…) are Base UI's own objects.
- App setup: wrap in `<Toast.Provider>` + `<Toaster />` and `ThemeProvider`; give the app root
  `isolation: isolate` (Base UI's portal recommendation).
- Routing: `<Button render={<Link to="/x" />} nativeButton={false}>`. `Card` / `PanelLink` take `as`,
  `Sidebar` / `AppShell` take a `linkComponent` that receives `href`.

## Theming

Semantic colors (`bg-surface`, `text-ink`, `border-line`, `bg-blue`…) map to CSS variables. Set
`<html data-theme="dark">` (ThemeProvider does it for you) and everything re-themes. Override any
`--token` after importing `theme.css` (or `tokens.css`) to rebrand.

## Exports

**Base UI components** (also at `@mah-works/larch/<component>`) — Accordion, AlertDialog, Autocomplete,
Avatar, Button, Checkbox, CheckboxGroup, Collapsible, Combobox, ContextMenu, Dialog, Drawer, Field,
Fieldset, Form, Input, Menu, Menubar, Meter, NavigationMenu, NumberField, OTPField, Popover,
PreviewCard, Progress, Radio, RadioGroup, ScrollArea, Select, Separator, Slider, Switch, Tabs, Toast,
Toggle, ToggleGroup, Toolbar, Tooltip — plus `TextArea` (Larch extension: Base UI Input as a textarea).

**Larch components** — Badge, AvatarStack, ClientMark, Icon, Card, Panel, PanelGrid, PanelSelect,
MetricCard, MetricGrid, ProgressRow, ProgressList, Legend, Dot, Alert, Skeleton, Kbd, EmptyState,
Eyebrow, DirectoryCard, DirectoryToolbar, ToolbarTitle, DirectoryTable, Row, Cell, CellTitle, Caption,
MoreButton, TableFooter, Pagination, PageSizeSelect, PageWrap, PageHeading

**Blocks** — AppShell, Sidebar, SidebarNav, SidebarStatus, Topbar, Brand, BrandMark, ClientsTable,
SelectionToolbar, ProjectCard, ProjectGrid, HealthChart, BarChart, Breakdown, ActivityList,
AccountItem, StatusList, PanelLink, Toaster

**Theme, tokens & hooks** — ThemeProvider, useTheme, themeScript, useSelection, useHotkey, useDismiss,
BUTTON_VARIANTS, AVATAR_TONES, AVATAR_SIZES, PROGRESS_TONES

## TypeScript

Larch ships declarations. Every styled part keeps Base UI's prop types (ref included) plus Larch's
visual props, so `<Button variant="nope">` or `<Avatar.Root tone="pink">` fail to compile. Larch's own
components export their prop types (`BadgeVariant`, `ClientRow`, `MetricCardProps`…).

`Dialog` and friends are values, so Base UI's type namespaces (`Dialog.Root.Props`) don't come along —
use `ComponentProps<typeof Dialog.Root>` or import them from `@base-ui/react/dialog`.

## What's new in 2.1

- **2.1.1:** `ThemeProvider` no longer causes a hydration mismatch in SSR apps when the stored or OS
  theme is dark. It renders the fallback theme (`defaultTheme`, else light) on the server and on the
  first client render, then switches to the real theme before paint.

- **RSC-ready build:** every module carries `'use client'`; `themeScript` is also at
  `@mah-works/larch/theme-script` (no `'use client'`).
- **Dark sections:** dark tokens apply to any `[data-theme='dark']` element, not only `<html>`.
  `<Topbar tone="dark">` keeps the bar dark in light mode. `Topbar` also takes `className`.
- **Collapsible sidebar:** `Sidebar` / `SidebarNav` take `collapsed`, `collapsedBrand` and
  `onCollapsedChange` (64px icon rail; the mobile drawer always shows the full menu).
- **Icons:** `car`, `money`.

If you override dark tokens with `:root[data-theme='dark']`, they still apply to the page; use
`[data-theme='dark']` so they also reach dark sections.

## Migrating from 1.x

2.0 requires React 19 and is written in TypeScript. It replaces Larch's hand-rolled Dialog, Dropdown,
Tabs, Tooltip, Checkbox, CheckRow, Switch, Field, TextInput, SelectInput, ProgressBar, Avatar, Divider/ToolbarDivider and ToastProvider/useToast with Base
UI components. See the "Base UI & styling" guide in the docs for a 1.x → 2.0 table.

Original compass-react names `WorkloadRow` and `RenewalItem` remain as aliases of `ProgressRow` and
`AccountItem`.
