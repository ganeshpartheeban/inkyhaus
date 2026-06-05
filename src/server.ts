// Cloudflare Workers entry point.
//
// The Build Brief (§11b) pins `wrangler.jsonc -> main: "src/server.ts"`. Modern
// TanStack Start ships its own Worker-compatible handler at
// `@tanstack/react-start/server-entry`, so we keep the brief's filename and simply
// re-export the framework handler. This is the single source of truth for the
// fetch handler the Cloudflare runtime invokes.
export { default } from '@tanstack/react-start/server-entry'
