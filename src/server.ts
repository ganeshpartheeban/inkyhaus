// Cloudflare Workers entry point.
//
// The Build Brief (§11b) pins `wrangler.jsonc -> main: "src/server.ts"`. Modern
// TanStack Start ships its own Worker-compatible handler at
// `@tanstack/react-start/server-entry`; we wrap it to add baseline security
// headers to SSR HTML responses — Cloudflare's `_headers` file only applies to
// static assets, never to worker-rendered pages.
import handler from '@tanstack/react-start/server-entry'

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    const response: Response = await (handler as { fetch: (r: Request, e: unknown, c: unknown) => Promise<Response> }).fetch(
      request,
      env,
      ctx,
    )
    const headers = new Headers(response.headers)
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      if (!headers.has(k)) headers.set(k, v)
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
  },
}
