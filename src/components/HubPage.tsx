// Product hub page: renders a hub's intro + product grid. Textile Printing shows
// one grid; Promotional Products groups products by PROMO_GROUPS.
import { Link } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'
import { HUBS, PROMO_GROUPS, productsForHub, productTo, type HubSlug, type Product } from '../lib/catalog'
import { Breadcrumbs, Section, SectionHeading } from './ui'
import { Cover } from './Cover'
import { Reveal } from './Reveal'

function ProductTile({ product, l, i }: { product: Product; l: 'de' | 'en'; i: number }) {
  return (
    <Reveal delay={i * 40}>
      <Link
        to={productTo(product.hub)}
        params={{ slug: product.slug }}
        className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5 active:scale-[0.985] motion-reduce:transition-none"
      >
        <Cover src={product.cover} accent={product.accent} alt={product.title[l]} sizes="(min-width: 1024px) 30vw, 45vw" className="aspect-[16/10] w-full" />
        <div className="p-4">
          <h3 className="text-base font-semibold leading-tight">{product.title[l]}</h3>
          <p className="mt-1 text-xs text-muted">{product.tagline[l]}</p>
        </div>
      </Link>
    </Reveal>
  )
}

export function HubPage({ hub }: { hub: HubSlug }) {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const h = HUBS[hub]
  const products = productsForHub(hub)

  return (
    <>
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: h.title[l] }]} />
      <Section className="!pt-8">
        <SectionHeading eyebrow={h.tagline[l]} title={h.title[l]} subtitle={h.intro[l]} />

        {hub === 'textile-printing' ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductTile key={p.slug} product={p} l={l} i={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {PROMO_GROUPS.map((group) => {
              const items = products.filter((p) => p.group === group.slug)
              if (!items.length) return null
              return (
                <div key={group.slug}>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{group.label[l]}</h2>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p, i) => (
                      <ProductTile key={p.slug} product={p} l={l} i={i} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Section>
    </>
  )
}
