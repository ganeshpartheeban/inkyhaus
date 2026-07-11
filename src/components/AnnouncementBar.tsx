// Top announcement bar (ascolour-style): dark strip above the header with an
// auto-scrolling marquee of the three core USPs. Closable per tab session —
// the inline head script in __root sets `data-announce-closed` before first
// paint so dismissed visitors never see it flash.
import { X } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { SITE } from '../lib/site-config'

export const ANNOUNCE_KEY = 'ih-announce-closed'

export function AnnouncementBar() {
  const { locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const items =
    l === 'en'
      ? [`Free delivery from €${SITE.freeDeliveryFrom}`, 'No minimum quantity', 'Express production (24–72 hrs)']
      : [`Kostenlose Lieferung ab ${SITE.freeDeliveryFrom} €`, 'Keine Mindestmenge', 'Express-Produktion (24–72h)']

  const close = () => {
    try {
      sessionStorage.setItem(ANNOUNCE_KEY, '1')
    } catch {
      /* ignore */
    }
    document.documentElement.setAttribute('data-announce-closed', '')
  }

  return (
    <div className="announce-bar relative bg-ink text-paper">
      <div className="overflow-hidden pr-12" aria-label={items.join(' · ')}>
        <div className="announce-track flex w-max py-2">
          {/* 8 identical groups: the -50% marquee loop stays seamless on any viewport width */}
          {Array.from({ length: 8 }, (_, g) => (
            <div key={g} aria-hidden={g > 0 || undefined} className="flex w-max items-center">
              {items.map((it, i) => (
                <span key={i} className="flex items-center gap-2 whitespace-nowrap px-6 text-xs font-medium tracking-wide">
                  <span className="text-accent-bright" aria-hidden>
                    ★
                  </span>
                  {it}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Solid mask column so the marquee doesn't scroll beneath the X */}
      <button
        type="button"
        onClick={close}
        aria-label={l === 'en' ? 'Close announcement' : 'Hinweis schließen'}
        className="absolute inset-y-0 right-0 grid w-10 place-items-center bg-ink text-paper/70 shadow-[-12px_0_10px_-6px_var(--color-ink)] transition-colors hover:text-paper"
      >
        <X size={15} aria-hidden />
      </button>
    </div>
  )
}
