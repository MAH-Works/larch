import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Modules React Server Components may import directly; every other module is a client module.
const SERVER_SAFE = /^theme\/script\.c?js$/;

// Library build: one module per source file so consumers tree-shake. React, Base UI and tailwind-merge stay
// external (Base UI is a peer, so the app and Larch share one copy and its contexts).
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // AI Elements live outside the root entry; markdown / highlight are their own entries because they
      // load optional peers (Streamdown, Shiki).
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'ai/index': resolve(import.meta.dirname, 'src/ai/index.ts'),
        'ai/markdown': resolve(import.meta.dirname, 'src/ai/markdown.tsx'),
        'ai/highlight': resolve(import.meta.dirname, 'src/ai/highlight.tsx'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react($|\/)/,
        /^@shadcn\/react($|\/)/,
        /^shiki($|\/)/,
        'streamdown',
        'tailwind-merge',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        // Components use hooks, context and event handlers, so mark them as client modules for
        // RSC frameworks (Next.js App Router). Harmless in plain React apps.
        banner: (chunk) => (SERVER_SAFE.test(chunk.fileName) ? '' : "'use client';"),
      },
    },
    sourcemap: true,
  },
});
