// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if you're not using JSX/TSX
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        slab: ['Cormorant+SC', 'serif'],
      },
      colors: {
        primary: '#f8d6d3',
        secondary: '#f8faf9',
        accent: '#f6c2bf',
        dark: '#1f1f1f',
        muted: '#999999',
        'light-pink': '#f6c2bf',
        'off-white': '#f8faf9',
        navy: '#1C1D25',
        blackout: '#0e0e0e',
        ember: '#2e2a2f',
        midnight: '#2a2d39',
      },
      spacing: {
        'hero-top': '5.5rem',
        'hero-bottom': '6rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}

