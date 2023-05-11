import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  appType: 'spa',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
      },
      output: {
        manualChunks: undefined // Optional: Deaktiviert manuelle Chunk-Erstellung
      }
    },
    outDir: './dist',
    assetsDir: './src/assets',
    // Hinzufügen der HTML-Konfiguration
    chunkSizeWarningLimit: 2000, // Optional: Legt das Limit für Chunk-Größenwarnungen fest
    // Konfiguration für die HTML-Generierung
    emptyOutDir: true, // Leert den Ausgabepfad (dist) vor dem Build
    sourcemap: true, // Erzeugt Sourcemaps für den Build
    manifest: true, // Generiert ein Manifest-File
    minify: true, // Minimiert HTML- und CSS-Dateien
    write: true,
    copyPublicDir: true,
  }
})
