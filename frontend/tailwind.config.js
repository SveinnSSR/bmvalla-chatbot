/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bmv-primary': '#2B4C38', // Example primary color (green)
        'bmv-secondary': '#D3D3D3', // Example secondary color (light gray)
        'bmv-accent': '#CDA85C', // Example accent color (gold)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}
