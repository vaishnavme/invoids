import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        gunmetal: {
          300: "#353e44",
          400: "#2c3337",
          700: "#1d2327",
          800: "#171c1f",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
