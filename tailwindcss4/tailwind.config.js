// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
          display: ['Space Grotesk', 'sans-serif'],
          body: ['Open Sans', 'sans-serif'],
        },
        colors: {
          primary: '#f8d6d3',
          secondary: '#f8faf9',
          accent: '#f6c2bf',
          dark: '#1f1f1f',
          muted: '#999999',
        },
        spacing: {
          'hero-top': '5.5rem',
          'hero-bottom': '6rem',
        },
      },
    },
    plugins: [],
  }
  