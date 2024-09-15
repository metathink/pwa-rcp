import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['RCP.svg', 'robots.txt',],
      injectRegister: 'auto',
      manifest: {
        name: 'rcp',
        short_name: 'rcp',
        description: 'rcp',
        start_url: "/",
        display: "standalone",
        theme_color: '#ffffff',
        icons: [
          {
            src: 'RCP.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'R.png',
            sizes: '512x512',
            type: 'image/png',
          },

        ],
      },
    }),
  ],
})
