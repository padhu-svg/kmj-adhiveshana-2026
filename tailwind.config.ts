import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F1",
        maroon: {
          DEFAULT: "#7A001E",
          dark: "#5A0016",
          light: "#9A0026",
        },
        gold: {
          DEFAULT: "#C89B3C",
          light: "#E0B85C",
          dark: "#A67B2C",
        },
        saffron: {
          DEFAULT: "#E07A00",
          light: "#F59A20",
        },
        brown: {
          DEFAULT: "#382415",
          light: "#5A3D2A",
        },
        night: {
          bg: "#2A1215",
          card: "#3D1A1F",
          stone: "#1E0C0E",
          text: "#F5E6D0",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        kannada: ["var(--font-noto-kannada)", "sans-serif"],
      },
      backgroundImage: {
        "temple-pattern":
          "radial-gradient(circle at 25% 25%, rgba(200,155,60,0.06) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(122,0,30,0.04) 0%, transparent 50%)",
        "gold-gradient":
          "linear-gradient(135deg, #C89B3C 0%, #E0B85C 50%, #C89B3C 100%)",
        "maroon-gradient":
          "linear-gradient(135deg, #7A001E 0%, #9A0026 50%, #7A001E 100%)",
        "night-stone":
          "radial-gradient(ellipse at 30% 20%, rgba(200,155,60,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(90,0,22,0.1) 0%, transparent 50%)",
      },
      boxShadow: {
        temple: "0 4px 30px rgba(122, 0, 30, 0.08), 0 1px 3px rgba(56, 36, 21, 0.06)",
        gold: "0 0 20px rgba(200, 155, 60, 0.3)",
        card: "0 8px 32px rgba(56, 36, 21, 0.08)",
        glow: "0 0 40px rgba(200, 155, 60, 0.15)",
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
