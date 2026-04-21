import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        hr: resolve(__dirname, 'hr/index.html'),
        learning: resolve(__dirname, 'learning/index.html'),
        superadmin: resolve(__dirname, 'superadmin/index.html'),
      },
    },
  },
})
