/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        interBlack: ['Inter Black', 'sans-serif'],
        interExtraBold: ['Inter ExtraBold', 'sans-serif'],
        interMedium: ['Inter Medium', 'sans-serif'],
        interRegular: ['Inter Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
