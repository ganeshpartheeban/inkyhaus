import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Clock, Truck, CreditCard, Wifi, Accessibility, Heart, Check, Mail, Phone } from 'lucide-react'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { SITE, whatsappLink } from '../lib/site-config'
import { STORE_INFO } from '../lib/content'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { JsonLd } from '../components/JsonLd'
import { MapCard } from '../components/MapCard'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

const EnquiryForm = lazy(() => import('../components/EnquiryForm'))

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: 'Kontakt & Angebot anfragen · Inkyhaus Berlin',
      description:
        'Kontakt zu Inkyhaus in Berlin-Friedrichshain: Angebot per Formular, WhatsApp oder E-Mail anfragen — Antwort meist am selben Tag. Abholung & Lieferung möglich.',
      path: '/contact',
      locale: DEFAULT_LOCALE,
    }),
  component: Contact,
})

function Contact() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Start', path: '/' }, { name: 'Kontakt', path: '/contact' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.contact') }]} />
      <Section id="booking-enquiry" className="!pt-8 scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t('nav.contact')}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{t('form.title')}</h1>
            <p className="mt-4 max-w-prose text-muted">
              {l === 'en'
                ? 'Tell us about your project — product, quantity and any deadline. We usually reply the same day.'
                : 'Erzählen Sie uns von Ihrem Projekt — Produkt, Menge und Termin. Meist antworten wir am selben Tag.'}
            </p>
            <div className="mt-8">
              <Suspense fallback={<p className="text-sm text-muted">…</p>}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-4">
            <a
              href={whatsappLink(
                l === 'en' ? 'Hi Inkyhaus, I would like a quote.' : 'Hallo Inkyhaus, ich hätte gern ein Angebot.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-whatsapp"
            >
              <WhatsAppIcon className="text-whatsapp" />
              <span>
                <span className="block font-medium">WhatsApp</span>
                <span className="block text-sm text-muted">{SITE.phone}</span>
              </span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <Mail className="text-accent" aria-hidden />
              <span>
                <span className="block font-medium">E-Mail</span>
                <span className="block text-sm text-muted">{SITE.email}</span>
              </span>
            </a>
            <a
              href={`mailto:${SITE.emailAlt}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <Mail className="text-accent" aria-hidden />
              <span>
                <span className="block font-medium">{l === 'en' ? 'Email (Gmail)' : 'E-Mail (Gmail)'}</span>
                <span className="block text-sm text-muted">{SITE.emailAlt}</span>
              </span>
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <Phone className="text-accent" aria-hidden />
              <span>
                <span className="block font-medium">{l === 'en' ? 'Call us' : 'Anrufen'}</span>
                <span className="block text-sm text-muted">{SITE.phone}</span>
              </span>
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <MapPin className="text-accent" aria-hidden />
              <span>
                <span className="block font-medium">{t('contact.visit')}</span>
                <span className="block text-sm text-muted">
                  {SITE.street}, {SITE.postalCode} {SITE.city} · {t('contact.directions')}
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
              <Clock className="text-accent" aria-hidden />
              <span>
                <span className="block font-medium">{SITE.productionHours}</span>
                <span className="block text-sm text-muted">
                  {l === 'en' ? 'Production · express available' : 'Produktion · Express möglich'}
                </span>
              </span>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="!pt-0">
        <MapCard className="aspect-[12/5] w-full" />
      </Section>

      <Section className="!pt-0">
        <SectionHeading title={t('contact.goodToKnow')} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STORE_INFO.map((group) => {
            const Icon = GROUP_ICON[group.id] ?? Check
            return (
              <div key={group.id} className="rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center gap-2.5">
                  <Icon size={18} className="text-accent" aria-hidden />
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{group.title[l]}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((it, i) => (
                    <li key={i} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft">
                      {it[l]}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Section>
    </>
  )
}

const GROUP_ICON: Record<string, typeof Truck> = {
  service: Truck,
  payments: CreditCard,
  amenities: Wifi,
  accessibility: Accessibility,
  community: Heart,
}
