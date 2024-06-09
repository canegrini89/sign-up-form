/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0099ff",
        secondary: "#f3f4f6",
      },
      backgroundImage: {
        signup: "url('./src/assets/wave.svg')",
      },
    },
  },
  plugins: [],
};
