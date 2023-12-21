/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "350px",
        md: "1000px",
        lg: "1299px",
      },
    },
  },
  plugins: [],
};
