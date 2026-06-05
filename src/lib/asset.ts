// Prefix a root-absolute public asset path with Vite's configured base
// (e.g. "/inkyhaus/" for a GitHub Pages project site). No-op when base is "/"
// (the Cloudflare Workers deploy), so the same source works for both targets.
export function withBase(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
