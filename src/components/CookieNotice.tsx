// Cookie / analytics notice. 10s auto-dismiss with a persistent flag, safe-area
// aware (§07). Analytics are cookie-free (Cloudflare Web Analytics) so this is a
// light, friendly disclosure rather than a consent gate.
import { useEffect, useState } from 'react'
import { useI18n } from '../lib/i18n'

const KEY = 'inkyhaus-cookie-ack'

export function CookieNotice() {
  const { t } = useI18n()
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!show) return
    const id = setTimeout(() => dismiss(), 10_000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  function dismiss() {
    setShow(false)
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-x-3 z-30 bottom-[calc(env(safe-area-inset-bottom)+5rem)] lg:bottom-4 lg:right-4 lg:left-auto lg:max-w-sm">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 text-sm shadow-lg backdrop-blur">
        <p className="text-muted">{t('cookie.text')}</p>
        <button
          type="button"
          onClick={dismiss}
          className="ml-auto shrink-0 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-paper transition-transform active:scale-95 motion-reduce:transition-none"
        >
          {t('cookie.accept')}
        </button>
      </div>
    </div>
  )
}
