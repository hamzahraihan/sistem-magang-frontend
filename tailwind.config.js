/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#FFDFD6',
        hoverColor: '#FFC1AF',
        activeColor: '#FFCEC0',
      },
      screens: {
        ssm: '490px',
      },
    },
  },
  plugins: [],
};
