/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.tsx',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
