/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('flowbite/plugin')
  ],
};