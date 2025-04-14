/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#4251B3",
        "secondary":"hsl(225, 100%, 75%)",
        "clr-1": "#90a29f",
        "clr-2": "#657171",
        "clr-3": "#f8ffff",
        "clr-4": "#a29790",
        "clr-5": "#716a65",

        "background": "var(--color-bg)",
        "background-sider": "var(--color-bg-sider)",
        "text": "var(--color-text)",
        "dark-table":"var(--color-bg-table)",
        "primary": "var(--color-primary)",
        "secondary": "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        "button-hover": "var(--color-primary-hover)",
        "yellow-green":"var(--color-yellow-green)",
        "green-hover":"var(--color-green-hover)",

        "dark-blue": "var(--color-dark-blue)",
        "blue1": "var(--color-blue1)",
        "blue2": "var(--color-blue2)",
        "blue3": "var(--color-blue3)",
        "light": "var(--color-light)",
        "my-brown": "var(--color-my-brown)",
        "yellow-green": "var(--color-yellow-green)",
      }
    },
  },
  plugins: [],
}