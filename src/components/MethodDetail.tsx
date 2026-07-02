// Printing-method detail page: what the method is, when it's the best choice,
// and which products use it.
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { PRODUCTS, productTo, type Method } from '../lib/catalog'
import { Breadcrumbs, Section, SectionHeading } from './ui'
import { Cover } from './Cover'
import { Reveal } from './Reveal'

export function MethodDetail({ method }: { method: Method }) {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const uses = PRODUCTS.filter((p) => p.methods.includes(method.slug))

  return (
    <>
      <Breadcrumbs
        items={[
          { name: t('nav.home'), to: '/' },
          { name: t('nav.methods'), to: '/printing-methods' },
          { name: method.name[l] },
        ]}
      />
      <Section className="!pt-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Cover
            src={method.image}
            accent={method.accent}
            alt={method.name[l]}
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="aspect-[4/3] w-full rounded-[var(--radius-card)] border border-line"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t('nav.methods')}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{method.name[l]}</h1>
            <p className="mt-3 text-lg text-muted">{method.tagline[l]}</p>
            <p className="mt-5 leading-relaxed">{method.description[l]}</p>
            <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{t('method.bestFor')}</h2>
              <p className="mt-2 text-sm">{method.bestFor[l]}</p>
            </div>
            <Link
              to="/contact"
              hash="booking-enquiry"
              className="mt-7 inline-flex items-center gap-2 rounded-lg flashy-gradient px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              {t('cta.requestQuote')} <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {uses.length > 0 && (
        <Section className="!pt-0">
          <SectionHeading title={t('method.products')} />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {uses.slice(0, 8).map((p, i) => (
              <Reveal key={p.slug} delay={i * 40}>
                <Link
                  to={productTo(p.hub)}
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5"
                >
                  <Cover src={p.cover} accent={p.accent} alt={p.title[l]} sizes="23vw" className="aspect-[16/10] w-full" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{p.title[l]}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
