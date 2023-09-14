const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // packages
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/analytics/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      prime: ['var(--font-rubik)', ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xs: [
        '0.75rem',
        {
          lineHeight: '1rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        },
      ],
      sm: [
        '0.875rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        },
      ],
      base: [
        '1rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        },
      ],
      lg: [
        '1.2rem',
        {
          lineHeight: '1.8rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        },
      ],
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
      '4xl': [
        '2.25rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        },
      ],
    },
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-primary-inverted': 'var(--color-bg-primary-inverted)',
        'bg-accent': 'var(--color-bg-accent)',
        'bg-accent-inverted': 'var(--color-bg-accent-inverted)',
        line: 'var(--color-line)',
        'line-disabled': 'var(--color-line-disabled)',
        'text-primary': 'var(--color-text-primary)',
        'text-primary-inverted': 'var(--color-text-primary-inverted)',
        'accent-primary': 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'icon-primary': 'var(--color-icon-primary)',
        'line-accent': 'var(--color-line-accent)',
        'line-accent-disabled': 'var(--color-line-accent-disabled)',
        backdrop: 'var(--color-backdrop)',
      },
    },
  },
}
