import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moveyellow: "#ffda34",
      },
      fontFamily: {
        primary: ['TWKEverettRegular', 'Helvetica', 'sans-serif'],
        secondary: ['"CosmoRegular"', 'monospace'],
      },
      spacing: {
        '2': '0.5rem',
        '4': '1rem',
        '8': '2rem',
        '10': '2.5rem',
        '16': '4rem',
      },
      fontSize: {
        'lg': '1.125rem',
        '4xl': '2.25rem',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1280px',
        'xl': '1536px',
      }
    },
  },
  plugins: [],
};
export default config;