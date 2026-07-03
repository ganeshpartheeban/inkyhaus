// Tawk.to live-chat widget. Injected client-side only, and ONLY after the user
// has explicitly consented via the cookie/consent banner (GDPR / § 25 TTDSG) —
// tawk.to sets its own storage and transfers data to the US. Positioned
// bottom-left so it never collides with the WhatsApp FAB or the mobile tab bar.
import { useEffect } from 'react'

const TAWK_SRC = 'https://embed.tawk.to/69b0e97fd378af1c365d2d57/1jjdh07dt'
export const CHAT_CONSENT_KEY = 'inkyhaus-chat-consent'
export const CONSENT_EVENT = 'inkyhaus-consent'

function inject() {
  if (typeof window === 'undefined') return
  if (document.getElementById('tawkto-script')) return // guard re-mounts / repeat events

  const w = window as unknown as { Tawk_API?: Record<string, unknown>; Tawk_LoadStart?: Date }
  const Tawk_API = (w.Tawk_API = w.Tawk_API || {})
  w.Tawk_LoadStart = new Date()
  Tawk_API.customStyle = {
    visibility: {
      desktop: { position: 'bl', xOffset: 20, yOffset: 20 },
      mobile: { position: 'bl', xOffset: 16, yOffset: 88 }, // above the mobile tab bar
    },
  }

  const s = document.createElement('script')
  s.id = 'tawkto-script'
  s.async = true
  s.src = TAWK_SRC
  s.charset = 'UTF-8'
  s.setAttribute('crossorigin', '*')
  document.head.appendChild(s)
}

export function TawkChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    let consented = false
    try {
      consented = localStorage.getItem(CHAT_CONSENT_KEY) === 'yes'
    } catch {
      /* ignore */
    }
    if (consented) {
      inject()
      return
    }
    // Not yet consented — load as soon as the banner grants consent this session.
    const onConsent = () => inject()
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  return null
}
