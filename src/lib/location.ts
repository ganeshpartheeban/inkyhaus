// Graceful 3-provider IP geolocation lookup (Build Brief §11g).
// ipapi.co -> ipwho.is -> api.country.is, 4s timeout each. Fire lazily on first
// form focus so it never burns requests on plain page views.
export const LOCATION_TIMEOUT_MS = 4000

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms)
    promise.then(
      (v) => {
        clearTimeout(id)
        resolve(v)
      },
      (err) => {
        clearTimeout(id)
        reject(err)
      },
    )
  })
}

export async function resolveLocation(): Promise<string> {
  const providers: Array<() => Promise<string>> = [
    async () => {
      const r = await fetch('https://ipapi.co/json/')
      const j = await r.json()
      const parts = [j.city, j.region, j.country_name].filter(Boolean)
      return parts.length ? `${parts.join(', ')}${j.ip ? ` (${j.ip})` : ''}` : ''
    },
    async () => {
      const r = await fetch('https://ipwho.is/')
      const j = await r.json()
      if (j && j.success !== false) {
        const parts = [j.city, j.region, j.country].filter(Boolean)
        return parts.length ? `${parts.join(', ')}${j.ip ? ` (${j.ip})` : ''}` : ''
      }
      return ''
    },
    async () => {
      const r = await fetch('https://api.country.is/')
      const j = await r.json()
      return j && j.country ? `${j.country}${j.ip ? ` (${j.ip})` : ''}` : ''
    },
  ]

  for (const p of providers) {
    try {
      const result = await withTimeout(p(), LOCATION_TIMEOUT_MS)
      if (result) return result
    } catch {
      // try next provider
    }
  }
  return ''
}
