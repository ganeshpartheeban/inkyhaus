// Sticky header: brand left, curated nav center (desktop), Enquire CTA + language
// toggle right. No hamburger — the bottom tab bar replaces it on mobile (§07).
import { Link } from '@tanstack/react-router'
import { useI18n, useLocaleTo } from '../lib/i18n'
import { HEADER_NAV } from '../lib/nav'
import { LanguageToggle } from './LanguageToggle'
import { withBase } from '../lib/asset'

export function Header() {
  const { t } = useI18n()
  const lp = useLocaleTo()

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="container-edge flex h-16 items-center justify-between gap-4">
        <Link to={lp('/') as '/'} className="flex items-center gap-2 shrink-0" aria-label="Inkyhaus — Start">
          <img src={withBase('/logo-mark-dark.png')} alt="" aria-hidden width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-medium tracking-tight">Inkyhaus</span>
            <span className="mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.24em] text-ink-soft">
              Custom Personalization
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {HEADER_NAV.map((item) => (
            <Link
              key={item.to}
              to={lp(item.to) as '/'}
              className="text-ink-soft hover:text-ink transition-colors [&.active]:text-ink [&.active]:font-medium"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link
            to={lp('/contact') as '/contact'}
            hash="booking-enquiry"
            className="rounded-lg flashy-gradient px-4 py-2 text-sm font-medium text-white transition active:scale-[0.985] motion-reduce:transition-none hover:opacity-90"
          >
            {t('cta.enquire')}
          </Link>
        </div>
      </div>
    </header>
  )
}
