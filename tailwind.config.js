/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['var(--font-poppins)']
      },
      colors: {
        'green-light': '#00AA5B',
        'green-border-light': '#20CE7D',
        'green-bg-choice': '#ECFEF4',
        'regal-blue': '#243c5a',

      }

    },
  },
  plugins: [],
})


