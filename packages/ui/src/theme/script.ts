/**
 * Inline script for <head> that sets the theme before first paint (avoids a light/dark flash).
 * Render it in SSR output or paste its string into index.html.
 *
 * This module has no React or browser imports and is built without "use client", so React Server
 * Components (e.g. a Next.js root layout) can import it from '@mah-works/larch/theme-script'.
 */
export const themeScript = (storageKey = 'larch-theme') =>
  `try{document.documentElement.dataset.theme=localStorage.getItem('${storageKey}')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}`;
