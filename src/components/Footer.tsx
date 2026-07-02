// Footer with editorial "Index No." that changes per route.
import { Link, useRouterState } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'
import { COMPANY_NAV } from '../lib/nav'
import { HUBS, PROMO_GROUPS, productsForHub } from '../lib/catalog'
import { SITE, whatsappLink } from '../lib/site-config'
import { withBase } from '../lib/asset'

// Route -> two-digit index for the editorial footer marker.
const INDEX_MAP: Record<string, string> = {
  '/': '01',
  '/textile-printing': '02',
  '/promotional-products': '03',
  '/printing-methods': '04',
  '/gallery': '05',
  '/about': '06',
  '/contact': '07',
}

export function Footer() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const index = INDEX_MAP[pathname] ?? '··'

  const textile = productsForHub('textile-printing').map((p) => ({
    to: `${HUBS['textile-printing'].path}/${p.slug}`,
    label: p.title[l],
  }))
  const promo = PROMO_GROUPS.map((g) => ({ to: HUBS['promotional-products'].path, label: g.label[l] }))

  return (
    <footer className="mt-24 border-t border-line bg-surface/60">
      <div className="container-edge py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <img src={withBase('/logo-dark.png')} alt="Inkyhaus" width={80} height={80} className="h-20 w-auto object-contain object-left" />
            <p className="mt-3 max-w-xs text-sm text-muted">{t('footer.tagline')}</p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-sm text-muted transition-colors hover:text-ink"
            >
              {SITE.street}
              <br />
              {SITE.postalCode} {SITE.city} · {SITE.district}
            </a>
            <a
              href={whatsappLink('Hallo Inkyhaus, ich habe eine Frage.')}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-whatsapp hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp · {SITE.phone}
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="mt-2 block text-sm text-muted transition-colors hover:text-ink">
              {t('footer.call')}: {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 block text-sm text-muted transition-colors hover:text-ink">
              {SITE.email}
            </a>
            <a href={`mailto:${SITE.emailAlt}`} className="mt-1 block text-sm text-muted transition-colors hover:text-ink">
              {SITE.emailAlt}
            </a>
          </div>

          <FooterCol title={t('nav.textile')} items={textile} />
          <FooterCol title={t('nav.promo')} items={promo} />
          <FooterCol title={t('footer.company')} items={COMPANY_NAV.map((i) => ({ to: i.to, label: t(i.key) }))} />
          <FooterCol
            title={t('footer.legal')}
            items={[
              { to: '/imprint', label: t('footer.imprint') },
              { to: '/privacy', label: t('footer.privacy') },
              { to: '/terms', label: t('footer.terms') },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Inkyhaus. {t('footer.rights')}
          </span>
          <span className="tracking-widest text-ink-soft">
            {index} · {t('nav.home')}
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: Array<{ to: string; label: string }> }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="text-muted transition-colors hover:text-ink">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
