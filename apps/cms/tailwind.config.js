/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('tailwind-custom/tailwind.config'),
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // packages
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
}
