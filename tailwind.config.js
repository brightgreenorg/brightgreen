/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        lime: "#7ED957",
        violet: "#8E44AD",
        yellow: "#F4D03F",
        ink: "#1C1C1C",
        bg: "#FAFAF7",
        muted: "#6a665d",
        border: "#e8e6df"
      },
      borderRadius: { lg: "18px", md: "12px" },
      boxShadow: { brand: "0 10px 40px rgba(0,0,0,.08)" }
    }
  },
  plugins: []
};
