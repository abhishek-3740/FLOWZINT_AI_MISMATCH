/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        slateBg: "#0b1220",
        accent: "#14b8a6",
        accentAlt: "#6366f1"
      },
      boxShadow: {
        panel: "0 12px 30px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};
