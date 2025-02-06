/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        // You can extend the default Tailwind theme here
        colors: {
          // Example custom colors
          'primary': '#1a73e8',
          'secondary': '#7c3aed',
        },
        // Example custom spacing
        spacing: {
          '128': '32rem',
        },
        // Example custom breakpoints
        screens: {
          '3xl': '1920px',
        },
      },
    },
    plugins: [],
  }