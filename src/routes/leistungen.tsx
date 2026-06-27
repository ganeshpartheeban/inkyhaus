import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, SPECIALTY, type ProductCategory } from '../lib/products'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD } from '../lib/seo'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Cover } from '../components/Cover'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'

export const Route = createFileRoute('/leistungen')({
  head: () =>
    pageHead({
      title: 'Leistungen · Textildruck, Gravur, 3D & Werbetechnik · Inkyhaus',
      description:
        'Alle Leistungen von Inkyhaus Berlin: Textildruck, Veredelung, Lasergravur, 3D-Druck, Aufkleber, Werbetechnik, Geschenke und mehr.',
      path: '/leistungen',
      locale: DEFAULT_LOCALE,
    }),
  component: Leistungen,
})

function Leistungen() {
  const { t } = useI18n()
  return (
    <>
      <JsonLd data={buildBreadcrumbLD([{ name: 'Home', path: '/' }, { name: 'Services', path: '/leistungen' }])} />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.services') }]} />
      <Section className="!pt-8">
        <SectionHeading title={t('leistungen.title')} subtitle={t('leistungen.subtitle')} />
        <h2 className="mt-12 text-sm font-semibold uppercase tracking-wider text-ink-soft">{t('leistungen.apparel')}</h2>
        <Grid items={CATEGORIES} />
        <h2 className="mt-14 text-sm font-semibold uppercase tracking-wider text-ink-soft">{t('leistungen.specialty')}</h2>
        <Grid items={SPECIALTY.filter((c) => c.slug !== 'werbetechnik')} /> {/* signage hidden for now */}
      </Section>
    </>
  )
}

function Grid({ items }: { items: ProductCategory[] }) {
  const { locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cat, i) => (
        <Reveal key={cat.slug} delay={i * 40}>
          <Link
            to={cat.path}
            className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5 active:scale-[0.985] motion-reduce:transition-none"
          >
            <Cover src={cat.cover} accent={cat.accent} alt={cat.title[l]} sizes="(min-width: 1024px) 30vw, 45vw" className="aspect-[16/9] w-full" />
            <div className="flex items-start justify-between gap-3 p-5">
              <div>
                <h3 className="font-serif text-lg">{cat.title[l]}</h3>
                <p className="mt-1 text-sm text-muted">{cat.tagline[l]}</p>
              </div>
              <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted group-hover:text-accent" aria-hidden />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
