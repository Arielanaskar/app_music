import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    './public/index.html',
  ],

  theme: {
    darkMode: 'class', 

    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
    },

  },

  plugins: [],
}
