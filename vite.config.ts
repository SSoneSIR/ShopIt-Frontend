import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true
  },
  
  // Build optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'sonner']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // Enable brotli compression
  compressPublicAssets: true
})