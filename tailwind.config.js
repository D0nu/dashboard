/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Removed blue-500 and kept your color scheme
        'primary-1': '#3A3A3A',
        'primary-2': '#E9EAB4',
        'dark-base': '#1C1C1C',
        'sub-1': '#4A4A4A',
        'sub-2': '#A0A0A0',
        'white': '#FFFFFF',


        'light-base': '#FFFFFF',
        'light-sub-1': '#F3F4F6',
        'light-sub-2': '#6B7280',
        'dark-text': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter'],
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },      backgroundSize: {
        'noise-pattern': '4px 4px, 4px 4px, auto'
      }
    },
  },
  plugins: [],
}