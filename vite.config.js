import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/ivc_shogi/',

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'どうぶつしょうぎ',
        short_name: 'どうぶつしょうぎ',
        theme_color: '#ffd54f',
        background_color: '#fff8e1',
        display: 'standalone',

        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
