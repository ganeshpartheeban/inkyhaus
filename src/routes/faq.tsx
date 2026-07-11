import { createFileRoute } from '@tanstack/react-router'
import { FAQS } from '../lib/content'
import { useI18n, DEFAULT_LOCALE, localePath } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD, buildFaqLD } from '../lib/seo'
import { Breadcrumbs, Section, SectionHeading } from '../components/ui'
import { JsonLd } from '../components/JsonLd'

export const Route = createFileRoute('/faq')({
  head: () =>
    pageHead({
      title: 'FAQ · Häufige Fragen · Inkyhaus Berlin',
      description:
        'Mindestmenge, Produktionszeit, Druckverfahren, Artwork, Lieferung und Haltbarkeit — Antworten rund um Textildruck bei Inkyhaus.',
      path: '/faq',
      locale: DEFAULT_LOCALE,
    }),
  component: Faq,
})

export function Faq() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbLD([{ name: l === 'en' ? 'Home' : 'Start', path: localePath(l, '/') }, { name: 'FAQ', path: localePath(l, '/faq') }]),
          buildFaqLD(l),
        ]}
      />
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: t('nav.faq') }]} />
      <Section className="!pt-8">
        <SectionHeading as="h1" title={t('home.faq.title')} />
        <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q[l]}
                <span className="text-accent transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-2 text-muted">{f.a[l]}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  )
}
