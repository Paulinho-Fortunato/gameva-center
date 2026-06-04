import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          helmet: ['react-helmet-async']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.svg')) return 'static/[name].[hash][extname]'
          return 'static/[name]-[hash][extname]'
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  
  server: {
    port: 3000,
    open: false
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-helmet-async'],
    exclude: ['hono']
  },
  
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none'
  }
})
