import { createFileRoute, Link } from '@tanstack/react-router'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { TRUST_POINTS } from '../lib/content'
import { Breadcrumbs, Section } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'
import { Check } from 'lucide-react'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: 'Über Inkyhaus · Textildruck-Studio Berlin Friedrichshain',
      description:
        'Handwerk, Liebe zum Detail und persönlicher Service: Inkyhaus ist Ihr Textildruck-Studio in Berlin Friedrichshain.',
      path: '/about',
      locale: DEFAULT_LOCALE,
    }),
  component: About,
})

function About() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.about') }]} />
      <Section className="!pt-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Berlin · Friedrichshain</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">
            {l === 'en' ? 'A Berlin studio for custom apparel' : 'Ein Berliner Studio für individuelle Textilien'}
          </h1>
          <div className="mt-6 space-y-4 text-lg text-ink-soft">
            <p>
              {l === 'en'
                ? 'Inkyhaus is a creative production partner, not a generic print shop. We help businesses and individuals turn ideas into premium custom clothing — produced locally in Berlin.'
                : 'Inkyhaus ist ein kreativer Produktionspartner — keine anonyme Druckerei. Wir helfen Unternehmen und Privatkunden, Ideen in hochwertige Bekleidung zu verwandeln, lokal in Berlin gefertigt.'}
            </p>
            <p>
              {l === 'en'
                ? 'From a single piece to large corporate programs, we obsess over print quality, garment selection and turnaround — with personal support at every step.'
                : 'Vom Einzelstück bis zum großen Firmenprogramm achten wir auf Druckqualität, Materialwahl und Geschwindigkeit — mit persönlicher Beratung in jedem Schritt.'}
            </p>
          </div>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, i) => (
            <Reveal as="li" key={i} delay={i * 30}>
              <div className="flex items-start gap-2.5 rounded-xl border border-line bg-surface p-4">
                <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span className="text-sm">{point[l]}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            to="/contact"
            hash="booking-enquiry"
            className="rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.985] motion-reduce:transition-none hover:bg-accent-strong"
          >
            {t('cta.enquire')}
          </Link>
        </div>
      </Section>
    </>
  )
}
