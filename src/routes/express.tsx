import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, MapPin, Layers, BadgeCheck } from 'lucide-react'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'

const BENEFITS = [
  { icon: Clock, de: 'Schnelle Produktion', en: 'Fast production' },
  { icon: MapPin, de: 'Abholung in Berlin möglich', en: 'Berlin pickup available' },
  { icon: Layers, de: 'Flexible Mengen', en: 'Flexible quantities' },
  { icon: BadgeCheck, de: 'Professionelle Qualität', en: 'Professional quality' },
]

export const Route = createFileRoute('/express')({
  head: () =>
    pageHead({
      title: 'Express Textildruck Berlin · Inkyhaus',
      description:
        'Eilige Bestellungen? Express-Textildruck in Berlin — kleine Mengen oft am selben Tag, Abholung möglich.',
      path: '/express',
      locale: DEFAULT_LOCALE,
    }),
  component: Express,
})

function Express() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Home', path: '/' }, { name: 'Express', path: '/express' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.express') }]} />
      <Section className="!pt-8">
        <SectionHeading eyebrow={t('home.express.eyebrow')} title={t('home.express.title')} subtitle={t('home.express.body')} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <b.icon className="text-accent" size={24} aria-hidden />
                <p className="mt-3 font-medium">{b[l]}</p>
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
            {t('home.express.cta')}
          </Link>
        </div>
      </Section>
    </>
  )
}
