/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Scan app folder
    './components/**/*.{js,ts,jsx,tsx}', // Scan components folder
    './lib/**/*.{js,ts,jsx,tsx}' // Scan lib folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}