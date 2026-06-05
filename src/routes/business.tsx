import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'

const SOLUTIONS: Array<{ de: string; en: string; body: { de: string; en: string } }> = [
  { de: 'Corporate Uniformen', en: 'Corporate uniforms', body: { de: 'Einheitlicher Look für Ihr Team — vom Polo bis zur Jacke.', en: 'A consistent look for your team — from polos to jackets.' } },
  { de: 'Onboarding-Kits', en: 'Onboarding kits', body: { de: 'Willkommenspakete für neue Mitarbeitende.', en: 'Welcome packs for new hires.' } },
  { de: 'Eventbekleidung', en: 'Event apparel', body: { de: 'Messen, Konferenzen, Aktivierungen.', en: 'Trade shows, conferences, activations.' } },
  { de: 'Branded Merchandise', en: 'Branded merchandise', body: { de: 'Hochwertige Markenartikel zum Verschenken.', en: 'Premium branded items to give away.' } },
  { de: 'Nachbestell-Programme', en: 'Repeat-order programs', body: { de: 'Designs gespeichert, jederzeit nachbestellbar.', en: 'Designs stored, re-orderable anytime.' } },
  { de: 'Mengenrabatte', en: 'Volume discounts', body: { de: 'Bessere Konditionen ab Stückzahl.', en: 'Better pricing at quantity.' } },
]

export const Route = createFileRoute('/business')({
  head: () =>
    pageHead({
      title: 'Firmenkleidung & Corporate Workwear Berlin · Inkyhaus',
      description:
        'Corporate Uniformen, Onboarding-Kits, Eventbekleidung und Merchandise mit Mengenrabatten und festem Ansprechpartner.',
      path: '/business',
      locale: DEFAULT_LOCALE,
    }),
  component: Business,
})

function Business() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Home', path: '/' }, { name: 'For Business', path: '/business' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.business') }]} />
      <Section className="!pt-8">
        <SectionHeading eyebrow={t('home.business.eyebrow')} title={t('home.business.title')} subtitle={t('home.business.body')} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-serif text-lg">{s[l]}</h3>
                <p className="mt-2 text-sm text-muted">{s.body[l]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/contact"
            hash="booking-enquiry"
            className="rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.985] motion-reduce:transition-none hover:bg-accent-strong"
          >
            {t('cta.quote')}
          </Link>
        </div>
      </Section>
    </>
  )
}
