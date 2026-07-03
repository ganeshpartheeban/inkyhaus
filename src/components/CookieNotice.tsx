// Consent banner. Analytics are cookie-free (Cloudflare Web Analytics), but the
// live chat (tawk.to) sets storage + transfers data to the US, so it loads only
// after an explicit "Accept". The banner shows until a choice is made (keyed off
// the chat-consent decision, not a generic dismiss). Safe-area aware (§07).
import { useEffect, useState } from 'react'
import { useI18n } from '../lib/i18n'
import { CHAT_CONSENT_KEY, CONSENT_EVENT } from './TawkChat'

export function CookieNotice() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      // Show until the visitor has explicitly accepted or declined the chat.
      if (localStorage.getItem(CHAT_CONSENT_KEY) == null) setShow(true)
    } catch {
      /* ignore */
    }
  }, [])

  function choose(consent: boolean) {
    setShow(false)
    try {
      localStorage.setItem(CHAT_CONSENT_KEY, consent ? 'yes' : 'no')
    } catch {
      /* ignore */
    }
    if (consent) window.dispatchEvent(new Event(CONSENT_EVENT))
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-3 z-30 bottom-[calc(env(safe-area-inset-bottom)+5rem)] lg:bottom-4 lg:right-4 lg:left-auto lg:max-w-sm">
      <div className="rounded-2xl border border-line bg-surface/95 p-4 text-sm shadow-lg backdrop-blur">
        <p className="text-muted">{t('cookie.text')}</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-lg bg-ink px-4 py-1.5 text-xs font-medium text-paper transition-transform active:scale-95 motion-reduce:transition-none"
          >
            {t('cookie.accept')}
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-lg border border-line px-4 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ink"
          >
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  )
}
