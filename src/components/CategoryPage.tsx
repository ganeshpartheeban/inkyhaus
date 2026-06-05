// Reusable product-category page body. Each category route is a thin wrapper.
import { Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import type { ProductCategory } from '../lib/products'
import { TECHNIQUES } from '../lib/products'
import { Cover } from './Cover'
import { Breadcrumbs, Section } from './ui'
import { Reveal } from './Reveal'
import { JsonLd } from './JsonLd'
import { buildBreadcrumbLD } from '../lib/seo'

export function CategoryPage({
  category,
  variant = 'apparel',
}: {
  category: ProductCategory
  variant?: 'apparel' | 'specialty'
}) {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'

  return (
    <>
      <JsonLd
        data={buildBreadcrumbLD([
          { name: 'Home', path: '/' },
          { name: category.title.en, path: category.path },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: t('nav.home'), to: '/' },
          { name: category.title[l] },
        ]}
      />

      <Section className="!pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{category.keyword}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{category.title[l]}</h1>
            <p className="mt-5 max-w-prose text-lg text-muted">{category.intro[l]}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                hash="booking-enquiry"
                className="rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.985] motion-reduce:transition-none hover:bg-accent-strong"
              >
                {t('cta.enquire')}
              </Link>
              <Link
                to={variant === 'apparel' ? '/print-techniques' : '/leistungen'}
                className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-ink"
              >
                {variant === 'apparel' ? t('nav.techniques') : t('nav.services')}
              </Link>
            </div>
          </div>
          <Cover
            src={category.cover}
            accent={category.accent}
            alt={category.title[l]}
            label={category.title[l]}
            sizes="(min-width: 1024px) 45vw, 90vw"
            priority
            className="aspect-[4/3] w-full rounded-[var(--radius-card)]"
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <h2 className="text-2xl">{l === 'en' ? 'Popular options' : 'Beliebte Optionen'}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {category.bullets.map((b, i) => (
            <Reveal as="li" key={i} delay={i * 40}>
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5">
                <Check size={18} className="shrink-0 text-accent" aria-hidden />
                <span className="text-sm">{b[l]}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {variant === 'apparel' && (
        <Section className="!pt-0">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8 sm:p-10">
            <h2 className="text-2xl">{l === 'en' ? 'Finish it your way' : 'Veredelung nach Wahl'}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {TECHNIQUES.map((tech) => (
                <span
                  key={tech.slug}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft"
                  style={{ borderColor: `oklch(0.85 0.06 ${tech.accent})` }}
                >
                  {tech.name[l]}
                </span>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
