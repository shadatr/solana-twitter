
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        gray: "#EBEBEB",
        darkGray: "#808080",
        babyBlue:"#71CBE8"
      },
      fontSize: {
        xxlg: "60px",
        xlg: "48px",
        lg: "32px",
        md: "20px",
        sm:"18px",
        xsm:"15px",
        xxsm:"8px"
      },
    },
    screens: {
      sm: "200px",
      md: "900px",
      lg: "1300px",
      xl: "1440px",
    },
  },
  plugins: [],
}