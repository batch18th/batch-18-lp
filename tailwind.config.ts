import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f7fd",
          100: "#e4effa",
          200: "#c3daf2",
          300: "#8fbce6",
          400: "#5598d4",
          500: "#2f76bb",
          600: "#245b96",
          700: "#25558e",
          800: "#224977",
          900: "#1f3e64"
        },
        ink: "#102033"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(31, 62, 100, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
