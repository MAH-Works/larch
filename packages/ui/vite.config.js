import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Library build: one module per source file so consumers tree-shake. React, Base UI and tailwind-merge stay
// external (Base UI is a peer, so the app and Larch share one copy and its contexts).
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^@base-ui\/react($|\/)/, 'tailwind-merge'],
      output: { preserveModules: true, preserveModulesRoot: 'src', exports: 'named' },
    },
    sourcemap: true,
  },
});
