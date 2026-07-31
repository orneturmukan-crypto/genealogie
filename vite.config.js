import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mon Arbre Généalogique',
        short_name: 'Généalogie',
        description: 'Application de gestion généalogique avec système Sosa-Stradonitz',
        theme_color: '#78350f',
        background_color: '#F4E8D8',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%2378350f" width="192" height="192"/><text x="96" y="140" font-size="120" font-weight="bold" text-anchor="middle" fill="white" font-family="serif">📚</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%2378350f" width="512" height="512"/><text x="256" y="380" font-size="320" text-anchor="middle" fill="white" font-family="serif">📚</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        categories: ['productivity'],
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%23F4E8D8" width="540" height="720"/><rect fill="%2378350f" width="540" height="100"/><text x="270" y="65" font-size="40" text-anchor="middle" fill="white" font-family="serif">📚 Généalogie</text></svg>',
            sizes: '540x720',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
