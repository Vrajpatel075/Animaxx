import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

console.log("✅ Vite config loaded");

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'offline.html'
      ],

      manifest: {
        name: 'Animaxx',
        short_name: 'Animaxx',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },

      // ✅ ONLY injectManifest (no workbox here)
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',

      injectManifest: {
        swSrc: 'src/sw.js',
        swDest: 'dist/sw.js'
      },

      devOptions: {
        enabled: false
      }
    })
  ]
})