/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#ED4E33",
          secondary: "#7E0732",
          accent: "#38152C",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        "neutral-dark": "#000000",
        "neutral-regular": "#2D2925",
        "neutral-medium": "#71655D",
        "neutral-light": "#B6A499",
        primary: "#ED4E33",
        white: "#FFF",
      },
    },
  },
  plugins: [require("daisyui")],
};
