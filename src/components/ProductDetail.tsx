// Shared product-detail template for both hubs. Renders overview, colours/sizes
// (apparel), applicable printing methods, min-order + delivery, FAQ, related
// products and the quote form. Missing images fall back to placeholder art.
import { lazy, Suspense } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Check, Clock, PackageCheck } from 'lucide-react'
import { useI18n, localePath } from '../lib/i18n'
import { HUBS, getMethod, relatedProducts, productTo, type Product } from '../lib/catalog'
import { Breadcrumbs, Section, SectionHeading } from './ui'
import { Cover } from './Cover'
import { Reveal } from './Reveal'
import { JsonLd } from './JsonLd'
import { buildBreadcrumbLD, buildOfferedServiceLD } from '../lib/seo'

const EnquiryForm = lazy(() => import('./EnquiryForm'))

export function ProductDetail({ product }: { product: Product }) {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const hub = HUBS[product.hub]
  const related = relatedProducts(product)

  const path = localePath(l, `${hub.path}/${product.slug}`)
  return (
    <>
      <JsonLd
        data={[
          // LD names follow the URL locale — matches the SSR-rendered language.
          buildBreadcrumbLD([
            { name: l === 'en' ? 'Home' : 'Start', path: localePath(l, '/') },
            { name: hub.title[l], path: localePath(l, hub.path) },
            { name: product.title[l], path },
          ]),
          buildOfferedServiceLD({ name: product.title[l], description: product.description[l], path, image: product.cover }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: t('nav.home'), to: '/' },
          { name: hub.title[l], to: hub.path },
          { name: product.title[l] },
        ]}
      />

      {/* Hero / overview */}
      <Section className="!pt-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Cover
            src={product.cover}
            accent={product.accent}
            alt={product.title[l]}
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="aspect-[4/3] w-full rounded-[var(--radius-card)] border border-line"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{hub.title[l]}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{product.title[l]}</h1>
            <p className="mt-3 text-lg text-muted">{product.tagline[l]}</p>
            <p className="mt-5 text-pretty leading-relaxed">{product.description[l]}</p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {h[l]}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-lg flashy-gradient px-6 py-3 font-medium text-white transition active:scale-[0.985] motion-reduce:transition-none hover:opacity-90"
              >
                {t('cta.requestQuote')} <ArrowRight size={17} aria-hidden />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <PackageCheck size={15} className="text-accent" aria-hidden />
                {l === 'en' ? `From ${product.minOrder} piece` : `Ab ${product.minOrder} Stück`}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} className="text-accent" aria-hidden />
                {product.deliveryTime[l]}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Colours */}
      {product.colours && (
        <Section className="!pt-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{t('product.colours')}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.colours.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm">
                <span className="h-4 w-4 rounded-full border border-line" style={{ backgroundColor: c.hex }} aria-hidden />
                {c.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">{t('product.coloursNote')}</p>
        </Section>
      )}

      {/* Sizes */}
      {product.sizes && (
        <Section className="!pt-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{t('product.sizes')}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <span key={s} className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm">{s}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">{t('product.sizesNote')}</p>
        </Section>
      )}

      {/* Printing methods */}
      <Section className="!pt-0">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{t('product.methods')}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {product.methods.map((slug) => {
            const m = getMethod(slug)
            if (!m) return null
            return (
              <Link
                key={slug}
                to="/printing-methods/$slug"
                params={{ slug }}
                className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm transition-colors hover:border-ink"
              >
                {m.name[l]}
              </Link>
            )
          })}
        </div>
      </Section>

      {/* FAQ */}
      {product.faq.length > 0 && (
        <Section className="!pt-0">
          <SectionHeading title={t('product.faq')} />
          <div className="mt-6 max-w-2xl divide-y divide-line border-y border-line">
            {product.faq.map((f, i) => (
              <details key={i} className="group py-4">
                <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">{f.q[l]}</summary>
                <p className="mt-2 text-sm text-muted">{f.a[l]}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <Section className="!pt-0">
          <SectionHeading title={t('product.related')} />
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 40}>
                <Link
                  to={productTo(p.hub)}
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5"
                >
                  <Cover src={p.cover} accent={p.accent} alt={p.title[l]} sizes="30vw" className="aspect-[16/10] w-full" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{p.title[l]}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Quote form */}
      <Section id="quote" className="scroll-mt-20">
        <SectionHeading eyebrow={t('nav.contact')} title={t('cta.requestQuote')} subtitle={t('product.quoteSub')} />
        <div className="mt-8 max-w-2xl">
          <Suspense fallback={<p className="text-sm text-muted">…</p>}>
            <EnquiryForm />
          </Suspense>
        </div>
      </Section>
    </>
  )
}
