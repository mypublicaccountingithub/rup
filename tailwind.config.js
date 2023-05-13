/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "main-purple": "#785FDC",
      "light-purple": "#DDD8F3",
      "light-purple2": "#9b87e9",

      black: colors.black,
      green: colors.green,
      white: colors.white,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      gray: colors.gray,
      indigo: colors.indigo,
      emerald: colors.emerald,
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
