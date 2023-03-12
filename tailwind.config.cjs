/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
};
