/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0b0508",
        charcoal: "#140a0f",
        blush: "#ff6b8a",
        rose: "#e0335f",
        crimson: "#c81d47",
        cream: "#fff5f2",
        gold: "#f5c04a",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        script: ["'Dancing Script'", "cursive"],
        body: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) rotate(8deg)" },
        },
        drift: {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) translateX(40px) rotate(360deg)", opacity: "0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 10s linear infinite",
        glow: "glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(224,51,95,0.35)",
        card: "0 20px 60px -15px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
