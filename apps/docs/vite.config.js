import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const ui = resolve(import.meta.dirname, '../../packages/ui/src');

// The docs run against the library *source* so edits hot-reload without rebuilding the package.
export default defineConfig({
  // GitHub Pages serves the docs from /<repo>/; CI sets DOCS_BASE. Local dev stays at /.
  base: process.env.DOCS_BASE || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^@mah-works\/larch\/(theme|tokens)\.css$/, replacement: `${ui}/$1.css` },
      // `@mah-works/larch/dialog` etc. mirror `@base-ui/react/dialog`.
      { find: /^@mah-works\/larch\/([a-z-]+)$/, replacement: `${ui}/base-ui/$1` },
      { find: /^@mah-works\/larch$/, replacement: `${ui}/index.js` },
    ],
  },
});
