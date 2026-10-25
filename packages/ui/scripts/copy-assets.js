// Ship the Tailwind preset and raw design tokens next to the compiled components.
import { copyFileSync } from 'node:fs';

copyFileSync('src/tailwind-preset.js', 'dist/tailwind-preset.js');
copyFileSync('src/styles/tokens.css', 'dist/tokens.css');
