import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { GALLERY, GALLERY_FILTERS } from '../lib/catalog'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Reveal } from '../components/Reveal'

export const Route = createFileRoute('/gallery')({
  head: () =>
    pageHead({
      title: 'Galerie · Inkyhaus Berlin',
      description: 'Ausgewählte Arbeiten aus Textildruck, Firmengeschenken, Werbeartikeln, Arbeitskleidung, Events und Hochzeiten.',
      path: '/gallery',
      locale: DEFAULT_LOCALE,
    }),
  component: Gallery,
})

function Gallery() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const [filter, setFilter] = useState<string>('all')
  const items = filter === 'all' ? GALLERY : GALLERY.filter((g) => g.tags.includes(filter))

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${
      active ? 'border-ink bg-ink text-paper' : 'border-line bg-surface hover:border-ink'
    }`

  return (
    <>
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.gallery') }]} />
      <Section className="!pt-8">
        <SectionHeading
          eyebrow={t('nav.gallery')}
          title={l === 'en' ? 'Selected work' : 'Ausgewählte Arbeiten'}
          subtitle={l === 'en' ? 'A cross-section of what leaves the Berlin studio.' : 'Ein Querschnitt dessen, was unser Berliner Studio verlässt.'}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          <button type="button" onClick={() => setFilter('all')} className={chip(filter === 'all')}>
            {l === 'en' ? 'All' : 'Alle'}
          </button>
          {GALLERY_FILTERS.map((f) => (
            <button key={f.slug} type="button" onClick={() => setFilter(f.slug)} className={chip(filter === f.slug)}>
              {f.label[l]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={g.src} delay={i * 30}>
              <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
                <img
                  src={g.src}
                  alt={g.alt[l]}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
