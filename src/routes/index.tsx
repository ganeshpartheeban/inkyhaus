import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, Clock, Globe, MapPin, PackageCheck, Sparkles, Star, Store } from 'lucide-react'
import { SITE } from '../lib/site-config'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildFaqLD, buildAggregateRatingLD } from '../lib/seo'
import { CATEGORIES, SPECIALTY, TECHNIQUES } from '../lib/products'
import { PROJECTS } from '../lib/portfolio'
import { FAQS, TESTIMONIALS, PROCESS, OCCASIONS, RATING, RATING_IS_REAL } from '../lib/content'
import { ProductCard } from '../components/ProductCard'
import { PlaceholderArt } from '../components/PlaceholderArt'
import { Cover } from '../components/Cover'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/ui'
import { JsonLd } from '../components/JsonLd'

// Quick-pick chips (Spreadshirt-style fast entry).
const QUICK = ['t-shirts', 'hoodies', 'lasergravur', 'werbetechnik', 'geschenke', 'aufkleber']

export const Route = createFileRoute('/')({
  head: () =>
    pageHead({
      title: 'Inkyhaus · Textildruck & individuelle Produktionen in Berlin',
      description:
        'Premium Textildruck in Berlin Friedrichshain: T-Shirts, Hoodies, Arbeitskleidung & Teamwear, dazu Lasergravur, 3D-Druck, Aufkleber & Werbetechnik. Keine Mindestmenge, 24–72h, Express möglich.',
      path: '/',
      locale: DEFAULT_LOCALE,
      ogImageAlt: 'Inkyhaus — Textildruck & individuelle Produktionen Berlin',
    }),
  component: Home,
})

function Home() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'

  return (
    <>
      <JsonLd
        data={
          RATING_IS_REAL
            ? [
                buildFaqLD(DEFAULT_LOCALE),
                buildAggregateRatingLD(
                  RATING.value,
                  RATING.count,
                  TESTIMONIALS.map((tm) => ({ author: tm.author, body: tm.quote.en })),
                ),
              ]
            : buildFaqLD(DEFAULT_LOCALE)
        }
      />
      <Hero />
      <TrustStrip />
      <QuickChips />

      {/* Apparel categories */}
      <Section>
        <SectionHeading eyebrow={t('home.categories.title')} title={t('home.categories.subtitle')} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 60}>
              <ProductCard category={cat} drift={i % 2 === 0} />
            </Reveal>
          ))}
        </div>
      </Section>

      <SpecialtyServices />
      <BusinessBand />
      <Channels />
      <Process />
      <Occasions />
      <Techniques />
      <PortfolioTeaser />
      <SocialProof />
      <FaqTeaser />
      <FinalCta />
    </>
  )

  // ── Hero ──────────────────────────────────────────────────────────────────
  function Hero() {
    return (
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <PlaceholderArt accent={35} className="absolute inset-0 opacity-[0.14]" />
        </div>
        <div className="container-edge grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink-soft">
              <Sparkles size={13} className="text-accent" aria-hidden /> {t('home.hero.eyebrow')}
            </p>
            <h1 className="mt-5 text-balance text-5xl leading-[1.02] sm:text-6xl">{t('home.hero.title')}</h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-muted">{t('home.hero.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                hash="booking-enquiry"
                className="inline-flex items-center gap-2 rounded-full flashy-gradient px-7 py-3.5 font-medium text-white glow-accent transition active:scale-[0.985] motion-reduce:transition-none hover:brightness-110"
              >
                {t('home.hero.ctaPrimary')} <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                to="/leistungen"
                className="inline-flex items-center rounded-full border border-line bg-surface/60 px-7 py-3.5 font-medium transition-colors hover:border-ink"
              >
                {t('nav.services')}
              </Link>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs text-ink-soft">
              <MapPin size={13} className="text-accent" aria-hidden /> {t('channels.badge')}
            </p>
          </div>

          <div className="relative hidden lg:block">
            <img
              src="/img/hero.webp"
              alt="Inkyhaus Ladengeschäft in Berlin — Textildruck, Gravur und Werbeartikel vor Ort"
              fetchPriority="high"
              decoding="async"
              className="aspect-[5/4] w-full rounded-[var(--radius-card)] border border-line object-cover object-center shadow-sm"
            />
          </div>
        </div>
      </section>
    )
  }

  function TrustStrip() {
    const items = [
      { icon: PackageCheck, text: t('home.trust.noMinimum') },
      { icon: MapPin, text: t('home.trust.local') },
      { icon: Clock, text: t('home.trust.express') },
      { icon: Check, text: t('home.trust.quality') },
    ]
    return (
      <div className="border-b border-line bg-surface/50">
        <div className="container-edge grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm">
              <it.icon size={18} className="shrink-0 text-accent" aria-hidden />
              <span className="text-ink-soft">{it.text}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function QuickChips() {
    return (
      <div className="border-b border-line">
        <div className="container-edge flex items-center gap-3 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">{t('home.quick.label')}</span>
          {QUICK.map((slug) => {
            const cat = [...CATEGORIES, ...SPECIALTY].find((c) => c.slug === slug)!
            return (
              <Link
                key={slug}
                to={cat.path}
                className="shrink-0 rounded-full border border-line bg-surface px-4 py-1.5 text-sm transition-colors hover:border-ink active:scale-[0.97] motion-reduce:transition-none"
              >
                {cat.title[l]}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  function SpecialtyServices() {
    return (
      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow={t('home.services.eyebrow')} title={t('home.services.title')} subtitle={t('home.services.subtitle')} />
          <Link to="/leistungen" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
            {t('cta.viewAll')} <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTY.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 40}>
              <Link
                to={cat.path}
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5 active:scale-[0.985] motion-reduce:transition-none"
              >
                <Cover src={cat.cover} accent={cat.accent} alt={cat.title[l]} sizes="(min-width: 1024px) 23vw, 45vw" className="aspect-[16/10] w-full" />
                <div className="p-4">
                  <h3 className="font-serif text-base leading-tight">{cat.title[l]}</h3>
                  <p className="mt-1 text-xs text-muted">{cat.tagline[l]}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function BusinessBand() {
    return (
      <Section>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 glow-accent">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-2/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-accent/25 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t('home.business.eyebrow')}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{t('home.business.title')}</h2>
              <p className="mt-4 max-w-xl text-muted">{t('home.business.body')}</p>
              <Link
                to="/business"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.985] motion-reduce:transition-none hover:bg-accent-strong"
              >
                {t('home.business.cta')} <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.slice(1, 5).map((cat) => (
                <Cover key={cat.slug} src={cat.cover} accent={cat.accent} alt={cat.title[l]} sizes="(min-width: 1024px) 18vw, 45vw" className="aspect-[5/4] w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </Section>
    )
  }

  function Channels() {
    return (
      <Section>
        <SectionHeading eyebrow={t('channels.eyebrow')} title={t('channels.title')} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <Globe className="text-accent" size={26} aria-hidden />
            <h3 className="mt-4 font-serif text-xl">{t('channels.online.title')}</h3>
            <p className="mt-2 text-muted">{t('channels.online.body')}</p>
            <Link to="/contact" hash="booking-enquiry" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              {t('cta.enquire')} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <Store className="text-accent" size={26} aria-hidden />
            <h3 className="mt-4 font-serif text-xl">{t('channels.offline.title')}</h3>
            <p className="mt-2 text-muted">{t('channels.offline.body')}</p>
            <p className="mt-4 text-sm text-ink-soft">
              {SITE.street} · {SITE.postalCode} {SITE.city}
            </p>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              {t('contact.directions')} <ArrowRight size={15} aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    )
  }

  function Process() {
    return (
      <Section className="bg-surface/50">
        <SectionHeading eyebrow={t('home.process.eyebrow')} title={t('home.process.title')} />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal as="li" key={i} delay={i * 60}>
              <div className="h-full rounded-2xl border border-line bg-paper p-6">
                <div className="flex items-center justify-between">
                  <img src={step.icon} alt="" aria-hidden width={56} height={56} loading="lazy" className="h-14 w-14 object-contain" />
                  <span className="font-serif text-3xl text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 font-medium">{step.title[l]}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.body[l]}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>
    )
  }

  function Occasions() {
    return (
      <Section>
        <SectionHeading eyebrow={t('home.occasions.eyebrow')} title={t('home.occasions.title')} subtitle={t('home.occasions.subtitle')} />
        <div className="mt-8 flex flex-wrap gap-3">
          {OCCASIONS.map((occ, i) => (
            <Reveal key={i} delay={i * 30}>
              <Link
                to={occ.to}
                className="group flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-2 pr-5 transition-colors hover:border-ink active:scale-[0.98] motion-reduce:transition-none"
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-white"
                  style={{ background: `oklch(0.62 0.17 ${occ.accent})` }}
                  aria-hidden
                >
                  <Sparkles size={15} />
                </span>
                <span className="text-sm font-medium">{occ.label[l]}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function Techniques() {
    return (
      <Section className="bg-surface/50">
        <SectionHeading
          eyebrow={t('home.techniques.eyebrow')}
          title={t('home.techniques.title')}
          subtitle={t('home.techniques.subtitle')}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TECHNIQUES.map((tech, i) => (
            <Reveal key={tech.slug} delay={i * 40}>
              <Link to="/print-techniques" className="group block">
                <Cover src={tech.image} accent={tech.accent} alt={tech.name[l]} sizes="(min-width: 1024px) 15vw, 30vw" className="aspect-square w-full rounded-2xl transition-transform group-hover:-translate-y-0.5" />
                <p className="mt-2 text-center text-sm font-medium">{tech.name[l]}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function PortfolioTeaser() {
    return (
      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow={t('home.portfolio.eyebrow')} title={t('home.portfolio.title')} subtitle={t('home.portfolio.subtitle')} />
          <Link to="/portfolio" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
            {t('cta.viewAll')} <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
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
                  <h3 className="mt-1 font-serif text-lg">{p.title[l]}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function SocialProof() {
    return (
      <Section className="bg-surface/50">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1 text-accent" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="currentColor" strokeWidth={0} className={i < Math.round(RATING.value) ? '' : 'opacity-30'} />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl">{t('home.social.title')}</h2>
          <p className="text-sm text-muted">
            {RATING.value.toLocaleString(l === 'en' ? 'en' : 'de', { minimumFractionDigits: 1 })} / 5 · {RATING.count}{' '}
            {t('home.social.reviews')}
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((tm, i) => (
            <Reveal key={i} delay={i * 70}>
              <figure className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-7">
                <div className="flex gap-0.5 text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-3 font-serif text-lg leading-snug">“{tm.quote[l]}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium text-ink">{tm.author}</span>
                  <span className="text-muted"> · {tm.role[l]}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function FaqTeaser() {
    return (
      <Section>
        <SectionHeading title={t('home.faq.title')} />
        <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
          {FAQS.slice(0, 5).map((f, i) => (
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
        <Link to="/faq" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
          {t('cta.viewAll')} <ArrowRight size={15} aria-hidden />
        </Link>
      </Section>
    )
  }

  function FinalCta() {
    return (
      <Section>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-72 rounded-full bg-accent-2/20 blur-3xl" aria-hidden />
          <h2 className="relative mx-auto max-w-2xl text-balance text-3xl text-gradient sm:text-4xl">{t('home.finalCta.title')}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted">{t('home.finalCta.body')}</p>
          <Link
            to="/contact"
            hash="booking-enquiry"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full flashy-gradient px-8 py-4 font-medium text-white glow-accent transition active:scale-[0.985] motion-reduce:transition-none hover:brightness-110"
          >
            {t('cta.enquire')} <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </Section>
    )
  }
}
