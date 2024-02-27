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
    extend: {
      fontFamily: {
        body: ["var(--font-inter)"],
      },
      colors: {
        neutral: {
          950: "#1e1e1e",
        },
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
