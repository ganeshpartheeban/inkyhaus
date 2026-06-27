// Tawk.to live-chat widget. Injected client-side only (the embed manipulates
// the DOM and must not run during SSR). Positioned bottom-LEFT so it never
// collides with the WhatsApp FAB (bottom-right) or the mobile BottomTabBar —
// and lifted above the tab bar on mobile.
import { useEffect } from 'react'

const TAWK_SRC = 'https://embed.tawk.to/69b0e97fd378af1c365d2d57/1jjdh07dt'

export function TawkChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.getElementById('tawkto-script')) return // guard re-mounts/HMR

    const w = window as unknown as { Tawk_API?: Record<string, unknown>; Tawk_LoadStart?: Date }
    const Tawk_API = (w.Tawk_API = w.Tawk_API || {})
    w.Tawk_LoadStart = new Date()

    // Must be set before the embed loads. Bottom-left, clear of other overlays.
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
  }, [])

  return null
}
