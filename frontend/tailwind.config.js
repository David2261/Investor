/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        "bg-sidebar-blue": "#009DFF",
      },
      width: {
        16: '16rem',
      },
      height: {
        16: '16rem',
      },
      // backgroundImage: (theme) => ({
      //   "gradient-yellowred":
      //     "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
      //   "mobile-home": "url('./assets/HomePageGraphic.png')",
      // }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      rotate: {
        '210': '210deg',
        '-45': '-45deg',
      },
      content: {
        // evolvetext: "url('./assets/EvolveText.png')",
        // abstractwaves: "url('./assets/AbstractWaves.png')",
        // sparkles: "url('./assets/Sparkles.png')",
        // circles: "url('./assets/Circles.png')",
      },
      spacing: {
        6: '1.5rem',
      }
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};