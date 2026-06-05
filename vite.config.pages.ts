// Static build for GitHub Pages (temporary preview).
// Unlike vite.config.ts (Cloudflare Workers / SSR), this drops the cloudflare
// plugin and prerenders every route to static HTML + a SPA fallback shell.
// Base path is injected via PAGES_BASE (e.g. "/inkyhaus/") so the same code
// works at root locally and under a project-pages subpath in CI.
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.PAGES_BASE || '/',
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
    }),
    viteReact(),
  ],
})
