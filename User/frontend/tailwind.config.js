/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f3f7f0',
          100: '#e4efde',
          200: '#c7ddbe',
          300: '#a8c09b',
          400: '#8ba68d',
          500: '#728b74',
          700: '#536a56',
          900: '#233427',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.22)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};