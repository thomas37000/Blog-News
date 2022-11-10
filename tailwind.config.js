/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: "tomato",
        orange: "#00668A",
      },
      fontFamily: {
        Roboto: ["Roboto, sans-serif"],
      },
      container: {
        center: true,
        padding: "2rem",
      },
      screens: {
        // breakpoints
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [],
};
