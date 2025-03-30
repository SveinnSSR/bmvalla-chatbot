/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bmv-primary': '#2B4C38',
        'bmv-secondary': '#D3D3D3',
        'bmv-accent': '#CDA85C',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}
