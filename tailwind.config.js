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

      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }
      "3xl": "1560px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        slate: {
          DEFAULT: "#2B3741",
          grey: "#75858D",
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
          superiority: "#7BA1B7",
        },
        red: {
          DEFAULT: "#ff0000",
        },
        modal: {
          DEFAULT: "#8c8c8c33",
          darker: "#00000080",
        },
      },
      spacing: {
        12.5: "3.125rem",
        40: "10rem",
        42: "10.5rem",
        50: "12.5rem",
        51.25: "12.8175rem",
        56.25: "14.0625rem",
        75: "18.75rem",
        90: "22.5rem",
        100: "25rem",
        126: "31.5rem",
        137.5: "34.375rem",
        175: "43.75rem",
        200: "50rem",
        "1/20": "5%",
        "1/10": "10%",
        "1/8": "12.5%",
        "9/20": "45%",
        "11/20": "55%",
        "1/5": "20%",
      },
      fontSize: {
        "2xs": "0.8125rem",
        xml: "1.375rem",
      },
    },
  },
  plugins: [],
};
