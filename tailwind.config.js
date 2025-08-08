/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
        '4': '4px',
      },
      textStrokeColor: {
        'black': 'black',
        'white': 'white',
        'red-500': '#ef4444',
      },
    },
  },
  plugins: [
    require('@designbycode/tailwindcss-text-stroke'),
  ],
}

