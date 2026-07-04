import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

// `devtools()` is dev-only — excluding it from production builds keeps its
// client/bridge out of the shipped bundle.
const config = defineConfig(({ command }) => ({
  resolve: { tsconfigPaths: true },
  plugins: [
    ...(command === 'serve' ? [devtools()] : []),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}))

export default config
