import preset from './src/tailwind-preset.js';

/** Used only to compile the prebuilt dist/styles.css for apps that don't run Tailwind. */
export default {
  presets: [preset],
  content: ['./src/**/*.{js,jsx}'],
};
