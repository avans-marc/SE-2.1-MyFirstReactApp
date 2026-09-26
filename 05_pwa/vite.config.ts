import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // On GitHub Pages the app lives in a subfolder (/<repo>/). The workflow sets BASE_PATH,
  // locally it's just "/".
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    react(),
    VitePWA({
      // Don't update silently: show a prompt so the user decides when to reload
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'My First React App',
        short_name: 'Cars',
        description: 'Browse and search cars, also offline.',
        theme_color: '#aa3bff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the app itself (HTML, JS, CSS, icons): it works offline after the first visit
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        // Cache the API response as well. NetworkFirst: fresh data when online,
        // the last cached copy when offline (or when the network takes longer than 3s)
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.href === 'https://avans.blob.core.windows.net/cars-api/cars.json',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'cars-api',
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
    }),
  ],
})
