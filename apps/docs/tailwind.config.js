import compass from '../../packages/ui/src/tailwind-preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [compass],
  content: ['./index.html', './src/**/*.{js,jsx}', '../../packages/ui/src/**/*.{js,jsx}'],
};
