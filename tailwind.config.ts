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
          50: "#f5f8fb",
          100: "#e8eef5",
          200: "#cddbe8",
          300: "#9fb8d2",
          400: "#6f94b9",
          500: "#416f9e",
          600: "#2b547f",
          700: "#233f62",
          800: "#1b304c",
          900: "#132338"
        },
        ink: "#111c2e"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(17, 28, 46, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
