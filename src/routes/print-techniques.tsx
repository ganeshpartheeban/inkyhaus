import { createFileRoute, Link } from '@tanstack/react-router'
import { TECHNIQUES } from '../lib/products'
import { useI18n } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Cover } from '../components/Cover'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'

export const Route = createFileRoute('/print-techniques')({
  head: () =>
    pageHead({
      title: 'Drucktechniken · Textildruck Berlin · Inkyhaus',
      description:
        'Vollfarbdruck, Puff, Glitzer, Reflex, Metallic und Neon — sechs Veredelungen für jedes Textil und Design.',
      path: '/print-techniques',
      locale: DEFAULT_LOCALE,
    }),
  component: PrintTechniques,
})

function PrintTechniques() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Home', path: '/' }, { name: 'Print Techniques', path: '/print-techniques' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.techniques') }]} />
      <Section className="!pt-8">
        <SectionHeading
          eyebrow={t('home.techniques.eyebrow')}
          title={t('home.techniques.title')}
          subtitle={t('home.techniques.subtitle')}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNIQUES.map((tech, i) => (
            <Reveal key={tech.slug} delay={i * 50}>
              <article className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
                <Cover src={tech.image} accent={tech.accent} alt={tech.name[l]} sizes="(min-width: 1024px) 30vw, 90vw" className="aspect-[16/10] w-full" />
                <div className="p-5">
                  <h3 className="font-serif text-lg">{tech.name[l]}</h3>
                  <p className="mt-1.5 text-sm text-muted">{tech.description[l]}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
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
