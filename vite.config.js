import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Enable polling to improve HMR reliability on some Windows setups
      usePolling: true,
      interval: 100
    }
  }
})
