// GitHub Pages has no SPA rewrites. Write dist/<route>/index.html for every known route so deep links
// return 200 (not the 404.html fallback), and keep 404.html for anything else.
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { CRM_PAGES } from '../src/crm/routes.ts';
import { AUTH_PAGES } from '../src/auth/routes.ts';

const dist = 'dist';
const index = join(dist, 'index.html');

// registry.ts uses import.meta.glob (Vite-only), so read its slugs as text.
const registry = readFileSync('src/docs/registry.ts', 'utf8');
const section = (from, to) => registry.slice(registry.indexOf(from), to ? registry.indexOf(to) : undefined);
const slugs = (text) => [...text.matchAll(/slug: '([a-z-]*)'/g)].map((m) => m[1]);

const examples = (kind) =>
  readdirSync(`src/examples/${kind}`).flatMap((slug) =>
    readdirSync(`src/examples/${kind}/${slug}`)
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => `preview/${kind}/${slug}/${f.replace(/^\d+-/, '').replace(/\.tsx$/, '')}`),
  );

const routes = [
  ...slugs(section('export const GUIDES', 'const BASE_UI')).filter(Boolean).map((s) => `docs/${s}`),
  ...slugs(section('const BASE_UI', 'export const BLOCKS')).map((s) => `components/${s}`),
  ...slugs(section('export const BLOCKS')).map((s) => `blocks/${s}`),
  'examples',
  ...CRM_PAGES.map((p) => `examples/crm/${p.path}`),
  ...AUTH_PAGES.map((p) => `examples/auth/${p.path}`),
  ...examples('components'),
  ...examples('blocks'),
];

for (const route of routes) {
  const file = join(dist, route, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  copyFileSync(index, file);
}
copyFileSync(index, join(dist, '404.html'));
console.log(`static routes: ${routes.length} pages + 404.html`);
