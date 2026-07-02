import { createFileRoute, Link } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { METHODS } from '../lib/catalog'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { Cover } from '../components/Cover'
import { Reveal } from '../components/Reveal'

export const Route = createFileRoute('/printing-methods/')({
  head: () =>
    pageHead({
      title: 'Druckverfahren · DTF, Stickerei, Sublimation, Lasergravur · Inkyhaus',
      description: 'DTF-Druck, Stickerei, Sublimationsdruck und Lasergravur — wir wählen das passende Verfahren für Ihr Produkt und Design.',
      path: '/printing-methods',
      locale: DEFAULT_LOCALE,
    }),
  component: Methods,
})

function Methods() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.methods') }]} />
      <Section className="!pt-8">
        <SectionHeading
          eyebrow={t('nav.methods')}
          title={l === 'en' ? 'The right method for every product' : 'Das passende Verfahren für jedes Produkt'}
          subtitle={l === 'en' ? 'Each technique shines in a different context — here is when we use which.' : 'Jede Technik spielt in einem anderen Kontext ihre Stärken aus — hier lesen Sie, wann wir welche einsetzen.'}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {METHODS.map((m, i) => (
            <Reveal key={m.slug} delay={i * 50}>
              <Link
                to="/printing-methods/$slug"
                params={{ slug: m.slug }}
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5"
              >
                <Cover src={m.image} accent={m.accent} alt={m.name[l]} sizes="(min-width: 640px) 45vw, 90vw" className="aspect-[16/9] w-full" />
                <div className="p-5">
                  <h2 className="text-lg font-semibold">{m.name[l]}</h2>
                  <p className="mt-1 text-sm text-muted">{m.tagline[l]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
