
/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./public/index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        gray: "#1D1D1D",
        darkGray: "#808080",
        babyBlue:"#007F91"
      },
      fontSize: {
        xxlg: "60px",
        xlg: "48px",
        lg: "32px",
        md: "20px",
        sm:"18px",
        xsm:"15px",
        xxsm:"12px"
      },
    },
    screens: {
      sm: "200px",
      md: "900px",
      lg: "1300px",
      xl: "1440px",
    },
  },
  darkMode: "class",
  plugins: [nextui(
    
  )]
}