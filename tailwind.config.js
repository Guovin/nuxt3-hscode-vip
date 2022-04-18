module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'black-dark': '#0d1117',
        'bread-blue': '#409EFF',
      },
    },
  },
  plugins: [],
}
