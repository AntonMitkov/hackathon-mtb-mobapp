import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // слушает 0.0.0.0 — нужно для ngrok
    port: 5173,
    allowedHosts: true,   // разрешает любые хосты, включая *.ngrok-free.app
  },
})
