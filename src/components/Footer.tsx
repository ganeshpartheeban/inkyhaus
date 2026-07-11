// Dark flyer-style footer (brand flyer: black bar, light text, orange accents).
import { Link } from '@tanstack/react-router'
import { Globe, Mail, Phone } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { useI18n, useLocaleTo } from '../lib/i18n'
import { COMPANY_NAV } from '../lib/nav'
import { HUBS, PROMO_GROUPS, productsForHub } from '../lib/catalog'
import { SITE, whatsappLink } from '../lib/site-config'
import { withBase } from '../lib/asset'
import { OPEN_CONSENT_EVENT } from './CookieNotice'

export function Footer() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const lp = useLocaleTo()

  const textile = productsForHub('textile-printing').map((p) => ({
    to: lp(`${HUBS['textile-printing'].path}/${p.slug}`),
    label: p.title[l],
  }))
  const promo = PROMO_GROUPS.map((g) => ({ to: lp(HUBS['promotional-products'].path), label: g.label[l] }))

  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-edge py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <img src={withBase('/logo-light.png')} alt="Inkyhaus" width={80} height={80} className="h-20 w-auto object-contain object-left" />
            <p className="mt-2">
              <span className="font-script text-2xl leading-none text-accent-soft">All-in-One</span>
              <span className="font-display mt-1 block text-sm tracking-wide text-paper">
                {l === 'en' ? 'Personalization & Print Studio' : 'Personalisierungs- & Druckstudio'}
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">{t('footer.tagline')}</p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-sm text-paper/60 transition-colors hover:text-paper"
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
              <WhatsAppIcon size={15} /> WhatsApp · {SITE.phone}
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="mt-2 block text-sm text-paper/60 transition-colors hover:text-paper">
              {t('footer.call')}: {SITE.phone}
            </a>
            <a href={`tel:${SITE.phone2.replace(/\s/g, '')}`} className="mt-1 block text-sm text-paper/60 transition-colors hover:text-paper">
              {t('footer.call')}: {SITE.phone2}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 block text-sm text-paper/60 transition-colors hover:text-paper">
              {SITE.email}
            </a>
            <a href={`mailto:${SITE.emailAlt}`} className="mt-1 block text-sm text-paper/60 transition-colors hover:text-paper">
              {SITE.emailAlt}
            </a>
          </div>

          <FooterCol title={t('nav.textile')} items={textile} />
          <FooterCol title={t('nav.promo')} items={promo} />
          <FooterCol title={t('footer.company')} items={COMPANY_NAV.map((i) => ({ to: lp(i.to), label: t(i.key) }))} />
          <FooterCol
            title={t('footer.legal')}
            items={[
              { to: '/imprint', label: t('footer.imprint') },
              { to: '/privacy', label: t('footer.privacy') },
              { to: '/terms', label: t('footer.terms') },
            ]}
          />
        </div>

        {/* Flyer contact bar: web · WhatsApp · mail */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-paper/15 pt-6 text-sm">
          <span className="flex items-center gap-2 text-paper/80">
            <Globe size={16} className="text-accent-bright" aria-hidden /> www.inkyhaus.de
          </span>
          <a
            href={whatsappLink('Hallo Inkyhaus!')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
          >
            <WhatsAppIcon size={16} className="text-whatsapp" /> {SITE.phone}
          </a>
          <a href={`tel:${SITE.phone2.replace(/\s/g, '')}`} className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper">
            <Phone size={16} className="text-accent-bright" aria-hidden /> {SITE.phone2}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper">
            <Mail size={16} className="text-accent-bright" aria-hidden /> {SITE.email}
          </a>
          <a href={`mailto:${SITE.emailAlt}`} className="flex items-center gap-2 text-paper/80 transition-colors hover:text-paper">
            <Mail size={16} className="text-accent-bright" aria-hidden /> {SITE.emailAlt}
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Inkyhaus. {t('footer.rights')}
          </span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
            className="underline-offset-2 transition-colors hover:text-paper hover:underline"
          >
            {t('footer.consent')}
          </button>
          <span>
            {l === 'en' ? 'Designed & developed with ' : 'Designed & entwickelt mit '}
            <span aria-hidden className="text-accent-bright">♥</span>
            {l === 'en' ? ' by ' : ' von '}
            <a
              href="https://ganeshpartheeban.in"
              target="_blank"
              rel="author noopener"
              title={l === 'en' ? 'Ganesh Partheeban — Portfolio' : 'Ganesh Partheeban — Portfolio'}
              className="font-medium text-paper/80 underline-offset-2 transition-colors hover:text-paper hover:underline"
            >
              Ganesh Partheeban
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: Array<{ to: string; label: string }> }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-paper/50">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to as '/'} className="text-paper/70 transition-colors hover:text-paper">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
