// Sticky header: brand left, curated nav center (desktop), Enquire CTA + language
// toggle right. No hamburger — the bottom tab bar replaces it on mobile (§07).
import { Link } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'
import { HEADER_NAV } from '../lib/nav'
import { LanguageToggle } from './LanguageToggle'

export function Header() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="container-edge flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Inkyhaus — Start">
          <img src="/logo-mark-light.png" alt="" aria-hidden width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-serif text-xl font-medium tracking-tight">Inkyhaus</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {HEADER_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-ink-soft hover:text-ink transition-colors [&.active]:text-ink [&.active]:font-medium"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link
            to="/contact"
            hash="booking-enquiry"
            className="rounded-full flashy-gradient px-4 py-2 text-sm font-medium text-white transition active:scale-[0.985] motion-reduce:transition-none hover:brightness-110"
          >
            {t('cta.enquire')}
          </Link>
        </div>
      </div>
    </header>
  )
}
