// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./styles/**/*.css",
  ],
  safelist: ["prose", "prose-zinc"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: { "2xl": "1200px" },
    },
    extend: {
      borderRadius: { xl: "16px", "2xl": "24px" },
      boxShadow: { card: "0 6px 24px rgba(0,0,0,0.06)" },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
