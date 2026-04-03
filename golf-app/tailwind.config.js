/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#06B6D4',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
