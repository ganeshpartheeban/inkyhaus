// Env-driven Google Apps Script form backend config (Build Brief §11d).
// Both values are baked into the client bundle at build time — not server secrets.
const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
const token = import.meta.env.VITE_FORM_TOKEN as string | undefined

if (import.meta.env.DEV && (!endpoint || !token)) {
  // eslint-disable-next-line no-console
  console.warn(
    '[form-config] VITE_FORM_ENDPOINT and/or VITE_FORM_TOKEN are not set. ' +
      'Form submissions will fail silently in production. ' +
      'Set them in .env.local (local dev) and in your CI secrets (deploy).',
  )
}

export const FORM_ENDPOINT = endpoint ?? ''
export const FORM_TOKEN = token ?? ''
