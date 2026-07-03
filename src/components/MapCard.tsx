// Clickable map widget. Self-hosted static map image (no runtime third-party /
// Google calls) that links to the Google Maps listing — opens the Maps app on
// mobile and a new tab on desktop.
import { MapPin, ExternalLink } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { withBase } from '../lib/asset'

export function MapCard({ className = '' }: { className?: string }) {
  const { t } = useI18n()
  return (
    <a
      href={SITE.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${SITE.street}, ${SITE.postalCode} ${SITE.city} — ${t('contact.directions')} (Google Maps)`}
      className={`group relative block overflow-hidden rounded-[var(--radius-card)] border border-line ${className}`}
    >
      <img
        src={withBase('/img/map.webp')}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
      <span className="pointer-events-none absolute right-2 top-2 rounded bg-paper/75 px-1.5 py-0.5 text-[10px] text-ink/70">© OpenStreetMap</span>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
        <span className="text-paper">
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <MapPin size={15} aria-hidden /> {SITE.street}
          </span>
          <span className="mt-0.5 block text-xs text-paper/85">
            {SITE.postalCode} {SITE.city} · {SITE.district}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-paper px-3 py-1.5 text-xs font-medium text-ink">
          {t('contact.directions')} <ExternalLink size={13} aria-hidden />
        </span>
      </div>
    </a>
  )
}
