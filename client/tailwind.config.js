/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "350px",
        md: "800px",
        lg: "1299px",
      },
    },
  },
  plugins: [],
};
