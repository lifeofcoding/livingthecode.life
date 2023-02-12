/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "hot-purple": "#2e026d",
        "hot-pink": "hsl(280,100%,70%)",
      },
    },
  },
  plugins: [],
};
