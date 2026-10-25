import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ui = resolve(import.meta.dirname, '../../packages/ui/src');

// The docs run against the library *source* so edits hot-reload without rebuilding the package.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@compass/ui/tokens.css', replacement: `${ui}/styles/tokens.css` },
      { find: /^@compass\/ui$/, replacement: `${ui}/index.js` },
    ],
  },
});
