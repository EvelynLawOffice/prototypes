import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',  // <-- ADD THIS FOR PATHS
  plugins: [
    tailwindcss(),
  ],
})