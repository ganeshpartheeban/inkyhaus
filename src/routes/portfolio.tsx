import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../lib/portfolio'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Cover } from '../components/Cover'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'

export const Route = createFileRoute('/portfolio')({
  head: () =>
    pageHead({
      title: 'Referenzen & Projekte · Textildruck Berlin · Inkyhaus',
      description: 'Ausgewählte Projekte aus Gastronomie, Sport, Events und Startups — echte Aufträge aus Berlin.',
      path: '/portfolio',
      locale: DEFAULT_LOCALE,
    }),
  component: Portfolio,
})

function Portfolio() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.portfolio') }]} />
      <Section className="!pt-8">
        <SectionHeading eyebrow={t('home.portfolio.eyebrow')} title={t('home.portfolio.title')} subtitle={t('home.portfolio.subtitle')} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5 active:scale-[0.985] motion-reduce:transition-none"
              >
                <Cover src={p.cover} accent={p.accent} alt={p.title[l]} sizes="(min-width: 1024px) 30vw, 90vw" className="aspect-[4/3] w-full" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{p.kind[l]}</p>
                  <h3 className="mt-1 flex items-start justify-between gap-2 font-serif text-lg">
                    {p.title[l]}
                    <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted group-hover:text-accent" aria-hidden />
                  </h3>
                  <p className="mt-1 text-sm text-muted">{p.intro[l]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
