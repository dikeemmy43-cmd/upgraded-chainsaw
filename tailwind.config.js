/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lumora: {
          green: '#22c55e',
          gold: '#f5c451',
          dark: '#020617',
        },
      },
    },
  },
  plugins: [],
};
