import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import tailwindcss from '@tailwindcss/vite'
import Sitemap from "vite-plugin-sitemap"
import mdx from "@mdx-js/rollup"

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

        // INFO
        '/about',
        '/contact',
        '/privacy-policy',
        '/tos',

        // GAMES
        '/games',
        '/games/x01',
        '/games/cricket',
        '/games/killer',
        '/games/shanghai',

        // RULEBOOK
        '/rules',
        '/rules/how-to-play-x01',
        '/rules/how-to-play-cricket-darts',
        '/rules/how-to-play-killer',
        '/rules/how-to-play-shanghai',
        '/rules/how-to-play-around-the-clock',

        // GUIDES
        '/guides',
        '/guides/dartboard-setup',
        '/guides/x01-checkout-chart',

        // BLOG
        '/blog',
        '/blog/techstack',
        '/blog/welcome',
        '/blog/future',
        '/blog/contributing',
        '/blog/best-way-to-keep-score-without-chalkboard',
      ],
    }),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [],
        rehypePlugins: []
      })
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
