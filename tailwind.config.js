/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#921300',
        hoverColor: '#B26E64',
        activeColor: '#570d09',
      },
      screens: {
        ssm: '490px',
        xm: '1280px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
