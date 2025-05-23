const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}',

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
        'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'bg-primary-inverted':
          'rgb(var(--color-bg-primary-inverted) / <alpha-value>)',
        'bg-accent': 'rgb(var(--color-bg-accent) / <alpha-value>)',
        'bg-accent-inverted':
          'rgb(var(--color-bg-accent-inverted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        'line-disabled': 'rgb(var(--color-line-disabled))',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-primary-inverted':
          'rgb(var(--color-text-primary-inverted) / <alpha-value>)',
        'accent-primary': 'rgb(var(--color-accent-primary) / <alpha-value>)',
        'accent-secondary':
          'rgb(var(--color-accent-secondary) / <alpha-value>)',
        'accent-primary-dimmed': 'rgb(var(--color-accent-primary-dimmed))',
        'accent-secondary-dimmed': 'rgb(var(--color-accent-secondary-dimmed))',
        'icon-primary': 'rgb(var(--color-icon-primary) / <alpha-value>)',
        'line-accent': 'rgb(var(--color-line-accent) / <alpha-value>)',
        'line-accent-disabled': 'rgb(var(--color-line-accent-disabled))',
        backdrop: 'rgb(var(--color-backdrop))',
      },
      backgroundImage: {
        'phone-h-gradient': `linear-gradient(to right, rgb(var(--color-bg-primary)) 0%,transparent 25%,transparent 80%,rgb(var(--color-bg-primary)) 100%)`,
      },
    },
  },
}
