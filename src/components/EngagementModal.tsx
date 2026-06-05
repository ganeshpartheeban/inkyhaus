// Engagement modal with a 1-day cooldown in localStorage (§07). Surfaces a soft
// quote nudge on first meaningful engagement. Respects reduced-motion.
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useI18n } from '../lib/i18n'

const KEY = 'inkyhaus-engage-until'
const COOLDOWN_MS = 24 * 60 * 60 * 1000

export function EngagementModal() {
  const { t, locale } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const until = Number(localStorage.getItem(KEY) || 0)
      if (Date.now() < until) return
    } catch {
      return
    }

    let fired = false
    const trigger = () => {
      if (fired) return
      fired = true
      setOpen(true)
      cleanup()
    }
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
      if (scrolled > 0.4) trigger()
    }
    const timer = setTimeout(trigger, 25_000)
    window.addEventListener('scroll', onScroll, { passive: true })
    function cleanup() {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
    return cleanup
  }, [])

  function close() {
    setOpen(false)
    try {
      localStorage.setItem(KEY, String(Date.now() + COOLDOWN_MS))
    } catch {
      /* ignore */
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center p-4">
      <button
        type="button"
        aria-label={t('a11y.close')}
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm motion-safe:animate-[page-fade_200ms_ease]"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-2xl motion-safe:animate-[page-fade_240ms_ease]"
      >
        <button
          type="button"
          onClick={close}
          aria-label={t('a11y.close')}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
        >
          <X size={18} aria-hidden />
        </button>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Inkyhaus</p>
        <h3 className="mt-2 font-serif text-2xl">
          {locale === 'en' ? 'Got a project in mind?' : 'Sie haben ein Projekt im Kopf?'}
        </h3>
        <p className="mt-2 text-sm text-muted">
          {locale === 'en'
            ? 'Tell us what you need — most quotes come back the same day. No minimum order.'
            : 'Sagen Sie uns, was Sie brauchen — die meisten Angebote kommen am selben Tag zurück. Keine Mindestmenge.'}
        </p>
        <Link
          to="/contact"
          hash="booking-enquiry"
          onClick={close}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 font-medium text-white transition-transform active:scale-[0.985] motion-reduce:transition-none hover:bg-accent-strong"
        >
          {t('cta.enquire')}
        </Link>
      </div>
    </div>
  )
}
