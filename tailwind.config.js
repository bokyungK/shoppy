/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'flow': 'repeat(auto-fit, minmax(270px, 1fr))'
      },
      colors: {
        'brand': 'rgb(87 83 78)',
        'hover-brand': 'rgb(68 64 60)',
      },
      backgroundImage: {
        'banner': 'url("../public/images/banner.webp")',
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

