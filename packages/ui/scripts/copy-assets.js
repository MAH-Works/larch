// Ship the Tailwind v4 theme and the raw design tokens next to the compiled components.
// theme.css uses `@source './'`, so from dist/ it scans the compiled components.
import { copyFileSync } from 'node:fs';

copyFileSync('src/theme.css', 'dist/theme.css');
copyFileSync('src/tokens.css', 'dist/tokens.css');
