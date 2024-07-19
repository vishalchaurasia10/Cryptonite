import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderColor: {
        "white-variant": "rgba(255, 255, 255, 0.5)",
      }
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
