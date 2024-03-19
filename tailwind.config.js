/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#921300',
        hoverColor: '#B26E64',
        activeColor: '#B26E64',
      },
      screens: {
        ssm: '490px',
        xm: '1280px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
