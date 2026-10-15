import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: [
        '**/.cache/**',
        '**/node_modules/.cache/**',
        '**/esp/**',
        '**/Wall-E/**',
        '**/ros2_ws/**',
        '**/meow_ws/**',
        '**/Build_Systems_Example2/**',
        '**/Flexwalk/**',
        '**/AmazeDex/**',
        '**/maro_ws/**',
        '**/pixelate/**',
        '**/Pixels*/**',
        '**/Pictures/**',
        '**/Videos/**',
        '**/Music/**',
        '**/Documents/**',
        '**/Downloads/**',
        '**/Desktop/**',
        '**/dist/**',
      ]
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
          'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
})
