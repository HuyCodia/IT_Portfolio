import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Erlaubt flexibles Hosting auf beliebigen Subdomains, GitHub Pages und Sub-Pfade
})
