/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        slate: {
          DEFAULT: "#2B3741",
        },
        charcoal: {
          darker: "#2B3236",
          DEFAULT: "#354859",
          lighter: "#4D6775",
        },
        grey: {
          lighter: "#C2C2C2",
          DEFAULT: "#B0B0B0",
          darker: "#6F848F",
        },
        green: {
          DEFAULT: "#26A433",
        },
        blue: {
          lighter: "#00314C",
          DEFAULT: "#3C9DD2",
          darker: "#002235",
        },
        red: {
          DEFAULT: "#ff0000",
        },
        modal: {
          DEFAULT: "#8c8c8c33",
        },
      },
      spacing: {
        12.5: "3.125rem",
        "1/10": "10%",
        "1/8": "12.5%",
        "9/20": "45%",
        "11/20": "55%",
        "1/5": "20%",
      },
      fontSize: {
        "2xs": "0.8125rem",
      },
    },
  },
  plugins: [],
};
