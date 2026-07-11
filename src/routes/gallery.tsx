import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { pageHead, buildBreadcrumbLD, buildImageGalleryLD } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE, localePath } from '../lib/i18n'
import { GALLERY, GALLERY_FILTERS } from '../lib/catalog'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'

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

export function Gallery() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const [filter, setFilter] = useState<string>('all')
  const [zoom, setZoom] = useState<number | null>(null)
  const items = filter === 'all' ? GALLERY : GALLERY.filter((g) => g.tags.includes(filter))
  const active = zoom != null ? items[zoom] : null

  useEffect(() => {
    if (zoom == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(null)
      if (e.key === 'ArrowRight') setZoom((z) => (z == null ? z : (z + 1) % items.length))
      if (e.key === 'ArrowLeft') setZoom((z) => (z == null ? z : (z - 1 + items.length) % items.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom, items.length])

  const chip = (isActive: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${
      isActive ? 'border-ink bg-ink text-paper' : 'border-line bg-surface hover:border-ink'
    }`

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbLD([
            { name: l === 'en' ? 'Home' : 'Start', path: localePath(l, '/') },
            { name: l === 'en' ? 'Gallery' : 'Galerie', path: localePath(l, '/gallery') },
          ]),
          buildImageGalleryLD(GALLERY.map((g) => ({ url: g.src, caption: g.alt[l], location: 'Berlin' }))),
        ]}
      />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.gallery') }]} />
      <Section className="!pt-8">
        <SectionHeading
          as="h1"
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
              <button
                type="button"
                onClick={() => setZoom(i)}
                aria-label={g.alt[l]}
                className="group block w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
              >
                <img
                  src={g.src}
                  alt={g.alt[l]}
                  // first row is above the fold — eager-load it so LCP isn't lazily deferred
                  loading={i < 4 ? 'eager' : 'lazy'}
                  fetchPriority={i < 2 ? 'high' : 'auto'}
                  decoding="async"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt[l]}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label={t('a11y.close')}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25"
          >
            <X size={20} aria-hidden />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
            <img src={active.src} alt={active.alt[l]} className="max-h-[80vh] w-auto rounded-[var(--radius-card)] object-contain" />
            <figcaption className="mt-3 text-center text-sm text-paper/80">{active.alt[l]}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
