import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion'))                              return 'animations';
          if (id.includes('recharts'))                                   return 'charts';
          if (id.includes('react-dom') || id.includes('react-router'))  return 'vendor';
          if (id.includes('node_modules/react/'))                       return 'vendor';
        },
      },
    },
  },
})
