import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  appType: 'mpa',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: './index.html'
      },
      output: {
        manualChunks: undefined
      }
    },
    outDir: './dist',
    assetsDir: './src/assets',
    chunkSizeWarningLimit: 2000,
    emptyOutDir: true,
    sourcemap: true,
    manifest: false,
    minify: true,
    write: true,
    copyPublicDir: true,
  }
});
