# @larch/ui

Quiet, dense React + Tailwind CSS v4 components for client-operations dashboards.

## Install

```bash
pnpm add @larch/ui     # peer deps: react >= 18, react-dom >= 18
```

### With Tailwind CSS v4 (recommended)

No `tailwind.config.js` — Larch is configured in CSS. With Vite:

```bash
pnpm add -D tailwindcss @tailwindcss/vite   # add tailwindcss() to vite.config plugins
```

```css
/* src/index.css */
@import 'tailwindcss';
@import '@larch/ui/theme.css';
```

`theme.css` brings the tokens, the semantic colors (`@theme inline`), shadows and the shimmer
animation (`@theme`), the `dark` / `narrow` / `tablet` / `mobile` variants (`@custom-variant`) and an
`@source` for the compiled components, so their classes are detected automatically.

### Without Tailwind

```js
import '@larch/ui/styles.css'; // tokens + preflight + every utility the components use
```

Load Inter (UI) and DM Mono (numerics), e.g. from Google Fonts.

## Use

```jsx
import { ThemeProvider, ToastProvider, PageWrap, PageHeading, Button, Icon, MetricGrid } from '@larch/ui';

<ToastProvider>
  <ThemeProvider>
    <PageWrap>
      <PageHeading eyebrow="Workspace" title="Overview">
        <Button variant="primary"><Icon name="download" size="sm" /> Export</Button>
      </PageHeading>
      <MetricGrid items={[{ label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }] }]} />
    </PageWrap>
  </ThemeProvider>
</ToastProvider>
```

The library is router-agnostic: `Button`, `Card` and `PanelLink` take `as={Link}`, and `Sidebar` /
`AppShell` take a `linkComponent` that receives `href`.

## Theming

Semantic colors (`bg-surface`, `text-ink`, `border-line`, `bg-blue`…) map to CSS variables. Set
`<html data-theme="dark">` (ThemeProvider does it for you) and everything re-themes. Override any
`--token` after importing `theme.css` (or `tokens.css`) to rebrand.

## Exports

**Components** — Button, Badge, Avatar, AvatarStack, ClientMark, Icon, Checkbox, CheckRow, Switch,
Field, TextInput, TextArea, SelectInput, Card, Panel, PanelGrid, PanelSelect, MetricCard, MetricGrid,
ProgressBar, ProgressRow, ProgressList, Legend, Dot, Alert, Skeleton, Tooltip, Kbd, EmptyState,
Eyebrow, Divider, ToolbarDivider, Dropdown, Tabs, Dialog, DirectoryCard, DirectoryToolbar,
ToolbarTitle, DirectoryTable, Row, Cell, CellTitle, Caption, MoreButton, TableFooter, Pagination,
PageSizeSelect, PageWrap, PageHeading

**Blocks** — AppShell, Sidebar, SidebarNav, SidebarStatus, Topbar, Brand, BrandMark, ClientsTable,
SelectionToolbar, ProjectCard, ProjectGrid, HealthChart, BarChart, Breakdown, ActivityList,
AccountItem, StatusList, PanelLink

**Theme & hooks** — ThemeProvider, useTheme, themeScript, ToastProvider, useToast, useSelection,
useHotkey, useDismiss

Original compass-react names `WorkloadRow` and `RenewalItem` remain as aliases of `ProgressRow` and
`AccountItem`.
