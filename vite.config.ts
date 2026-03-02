import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import tailwindcss from '@tailwindcss/vite'
import Sitemap from "vite-plugin-sitemap"

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
    svgr(),
    Sitemap({ 
      hostname: 'https://arraz.app',

      dynamicRoutes: [
        '/',
        '/rules', // Or whatever your rulebook URL is
        '/setup',
        '/about',
        '/contact',
        '/privacy-policy',
        '/tos',
        '/x01',
        '/killer',
        '/rules/x01'
      ],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
