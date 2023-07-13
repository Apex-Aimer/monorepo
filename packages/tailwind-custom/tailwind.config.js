const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      prime: ['var(--font-rubik)', ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xl: [
        '1.4rem',
        {
          lineHeight: '1.68rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        },
      ],
      '2xl': [
        '1.625rem',
        {
          lineHeight: '1.95rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        },
      ],
      '3xl': [
        '1.875rem',
        {
          lineHeight: '2.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        },
      ],
    },
    extend: {
      colors: {
        'text-primary': 'rgb(64, 64, 64)',
      },
    },
  },
  plugins: [],
}
