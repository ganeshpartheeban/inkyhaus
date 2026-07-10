import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight, Check, Clock, Globe, MapPin, PackageCheck, Star, Store,
  BadgeCheck, Zap, Building2, PenTool, Shirt, ListOrdered, Upload, ReceiptText, Factory, Truck,
  Sparkles, Coffee, Sticker, Box, MessagesSquare,
} from 'lucide-react'
import { SITE } from '../lib/site-config'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead } from '../lib/seo'
import { HUBS, METHODS, GALLERY, getProduct, productTo, type Product } from '../lib/catalog'
import { FAQS, TESTIMONIALS, RATING, WHY_US, HOW_STEPS } from '../lib/content'
import { withBase } from '../lib/asset'
import { Cover } from '../components/Cover'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { Section, SectionHeading } from '../components/ui'

const FEATURED = ['t-shirts', 'hoodies', 'caps', 'mugs', 'corporate-gift-sets', 'wedding-gifts']
const WHY_ICONS = [BadgeCheck, Zap, PackageCheck, Building2, MapPin, PenTool]
const HOW_ICONS = [Shirt, ListOrdered, Upload, ReceiptText, Factory, Truck]

// The five core services from the brand flyer (design-src/model.png), with the
// flyer's exact labels/sub-lines. `method: null` links to the textile hub.
const HERO_SERVICES = [
  { icon: Shirt, method: null, label: { de: 'Textildruck', en: 'Textile Printing' }, sub: { de: 'DTF • HTV', en: 'DTF • HTV' } },
  { icon: Sparkles, method: 'laser-engraving', label: { de: 'Lasergravur', en: 'Laser Engraving' }, sub: { de: 'Holz • Glas • Metall uvm.', en: 'Wood • glass • metal & more' } },
  { icon: Coffee, method: 'sublimation', label: { de: 'Sublimation', en: 'Sublimation' }, sub: { de: 'Tassen • Flaschen uvm.', en: 'Mugs • bottles & more' } },
  { icon: Sticker, method: 'sticker-vinyl', label: { de: 'Sticker & Vinyl', en: 'Stickers & Vinyl' }, sub: { de: 'Aufkleber • Banner uvm.', en: 'Stickers • banners & more' } },
  { icon: Box, method: '3d-printing', label: { de: '3D-Druck', en: '3D Printing' }, sub: { de: 'Individuell & kreativ', en: 'Custom & creative' } },
] as const

// Decorative concentric-rings illustration for the hero — a warm accent graphic
// in the spirit of the reference site's vector shapes. Purely ornamental.
function HeroRings() {
  return (
    <div className="anim-float absolute -right-24 -top-24 hidden h-[34rem] w-[34rem] text-accent/25 sm:block lg:right-[-6rem]">
      <svg viewBox="0 0 400 400" fill="none" className="anim-spin-slow h-full w-full" aria-hidden>
        <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="115" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="196" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx="200" cy="40" r="4" fill="currentColor" />
        <circle cx="360" cy="200" r="3" fill="currentColor" />
        <circle cx="200" cy="360" r="2.5" fill="currentColor" />
      </svg>
    </div>
  )
}

export const Route = createFileRoute('/')({
  head: () =>
    pageHead({
      title: 'Inkyhaus · Textildruck & Werbeartikel in Berlin',
      description:
        'Premium Textildruck & Werbeartikel in Berlin: T-Shirts, Hoodies, Workwear, Tassen, Gravuren & mehr. Keine Mindestmenge, 24–72h, Express möglich.',
      path: '/',
      locale: DEFAULT_LOCALE,
      ogImageAlt: 'Inkyhaus — Textildruck & Werbeartikel Berlin',
    }),
  component: Home,
})

function Home() {
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const L = (de: string, en: string) => (l === 'en' ? en : de)
  const featured = FEATURED.map(getProduct).filter((p): p is Product => !!p)

  return (
    <>
      {/* No FAQPage LD here (lives on /faq only) and no self-serving review
          markup (Google ignores/penalises org-controlled review LD) — the
          rating stays visible in SocialProof and links to the Google listing. */}
      <Hero />
      <TrustStrip />
      <Hubs />
      <Featured />
      <WhyInkyhaus />
      <HowItWorks />
      <Methods />
      <BusinessBand />
      <Channels />
      <GalleryTeaser />
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
          <HeroRings />
        </div>
        <div className="container-edge grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="anim-rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink-soft">
              <MapPin size={13} className="text-accent" aria-hidden /> {SITE.city} {SITE.district} · {SITE.street}
            </p>
            <h1 className="anim-rise mt-5 text-6xl leading-[0.98] sm:text-7xl lg:text-[5.2rem]" style={{ animationDelay: '90ms' }}>
              {L('Deine Idee.', 'Your idea.')}
              <span className="mt-1 block text-accent-bright">
                {L('Wir machen’s persönlich.', 'We make it personal.')}
              </span>
            </h1>
            {/* h2 (styled as body copy) so the page's topical keywords sit in a
                heading — the h1 above is deliberately the brand slogan. */}
            <h2 className="anim-rise mt-5 max-w-xl font-sans text-lg font-normal normal-case leading-relaxed tracking-normal text-pretty text-muted" style={{ animationDelay: '180ms' }}>
              {L(
                'Premium Textildruck & Werbeartikel in Berlin — vom einzelnen Stück bis zum großen Firmenauftrag, für Unternehmen, Events und Privatpersonen.',
                'Premium textile printing & promotional products in Berlin — from single pieces to bulk corporate orders, for businesses, events and individuals.',
              )}
            </h2>

            {/* Flyer services row — the five core techniques */}
            <ul className="anim-rise mt-8 grid max-w-xl grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5" style={{ animationDelay: '240ms' }}>
              {HERO_SERVICES.map((s) => {
                const inner = (
                  <>
                    <s.icon size={30} strokeWidth={1.5} aria-hidden className="mx-auto text-ink transition-colors group-hover:text-accent" />
                    <span className="font-display mt-2 block text-[11px] leading-tight tracking-wide">{s.label[l]}</span>
                    <span className="mt-0.5 block text-[10px] leading-tight text-muted">{s.sub[l]}</span>
                  </>
                )
                return (
                  <li key={s.label.de}>
                    {s.method ? (
                      <Link to="/printing-methods/$slug" params={{ slug: s.method }} className="group block text-center">
                        {inner}
                      </Link>
                    ) : (
                      <Link to="/textile-printing" className="group block text-center">
                        {inner}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Flyer USP pill */}
            <div className="anim-rise mt-8 inline-flex max-w-full flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface px-5 py-3.5" style={{ animationDelay: '300ms' }}>
              <span className="flex items-center gap-2 text-sm"><Clock size={17} className="text-accent" aria-hidden /> {L('Express 24–72h', 'Express 24–72h')}</span>
              <span className="flex items-center gap-2 text-sm"><BadgeCheck size={17} className="text-accent" aria-hidden /> {L('Premium Qualität', 'Premium quality')}</span>
              <span className="flex items-center gap-2 text-sm"><MessagesSquare size={17} className="text-accent" aria-hidden /> {L('Persönliche Beratung', 'Personal support')}</span>
            </div>

            <div className="anim-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '360ms' }}>
              <Link
                to="/contact"
                hash="booking-enquiry"
                className="inline-flex items-center gap-2 rounded-lg flashy-gradient px-7 py-3.5 font-medium text-white transition active:scale-[0.985] motion-reduce:transition-none hover:opacity-90"
              >
                {t('cta.requestQuote')} <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                to="/textile-printing"
                className="inline-flex items-center rounded-lg border border-line bg-surface px-7 py-3.5 font-medium transition-colors hover:border-ink"
              >
                {t('cta.browseProducts')}
              </Link>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: '240ms' }}>
            <TiltCard max={5} className="relative">
              <img
                src={withBase('/img/hero.webp')}
                alt="Inkyhaus Studio Berlin — bedrucktes T-Shirt, Trinkflasche, Cap, Tasse und Gravur vor der Transferpresse"
                width={1000}
                height={1250}
                fetchPriority="high"
                decoding="async"
                className="max-h-[30rem] w-full rounded-[var(--radius-card)] border border-line object-cover object-top shadow-sm lg:max-h-none lg:aspect-[4/5]"
              />
              {/* All-in-One badge, mirroring the flyer's bottom-right box; floats in 3D on tilt */}
              <div className="tilt-pop absolute -bottom-3 right-4 rounded-xl bg-ink px-5 py-3 text-right shadow-lg sm:right-6">
                <span className="font-script block text-2xl leading-none text-accent-soft">{L('All-in-One', 'All-in-One')}</span>
                <span className="font-display mt-1 block text-xs tracking-wide text-white">
                  {L('Personalisierungs- & Druckstudio', 'Personalization & Print Studio')}
                </span>
              </div>
            </TiltCard>
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
      <div className="border-b border-line bg-surface/60">
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

  // ── Two product hubs ────────────────────────────────────────────────────────
  function HubCard({ to, cover, accent, title, tagline }: { to: '/textile-printing' | '/promotional-products'; cover?: string; accent: number; title: string; tagline: string }) {
    return (
      <Link
        to={to}
        className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform hover:-translate-y-0.5"
      >
        <Cover src={cover} accent={accent} alt={title} sizes="(min-width: 768px) 45vw, 90vw" className="aspect-[16/10] w-full" />
        <div className="p-6">
          <h3 className="text-2xl">{title}</h3>
          <p className="mt-1 text-sm text-muted">{tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            {L('Ansehen', 'Explore')} <ArrowRight size={15} aria-hidden />
          </span>
        </div>
      </Link>
    )
  }

  function Hubs() {
    return (
      <Section>
        <SectionHeading eyebrow={L('Sortiment', 'Our range')} title={L('Zwei Wege, Ihre Marke zu zeigen', 'Two ways to show your brand')} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <HubCard to="/textile-printing" cover={getProduct('t-shirts')?.cover} accent={35} title={HUBS['textile-printing'].title[l]} tagline={HUBS['textile-printing'].tagline[l]} />
          <HubCard to="/promotional-products" cover={getProduct('corporate-gift-sets')?.cover} accent={255} title={HUBS['promotional-products'].title[l]} tagline={HUBS['promotional-products'].tagline[l]} />
        </div>
      </Section>
    )
  }

  function Featured() {
    return (
      <Section className="!pt-0">
        <SectionHeading eyebrow={L('Beliebt', 'Popular')} title={L('Häufig angefragt', 'Frequently requested')} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}>
              <TiltCard max={6}>
                <Link
                  to={productTo(p.hub)}
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
                >
                  <Cover src={p.cover} accent={p.accent} alt={p.title[l]} sizes="(min-width: 1024px) 30vw, 45vw" className="aspect-[16/10] w-full" />
                  <div className="p-4">
                    <h3 className="text-base font-semibold leading-tight">{p.title[l]}</h3>
                    <p className="mt-1 text-xs text-muted">{p.tagline[l]}</p>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function WhyInkyhaus() {
    return (
      <Section className="bg-surface/50">
        <SectionHeading eyebrow={L('Warum Inkyhaus', 'Why Inkyhaus')} title={L('Ihre Vorteile auf einen Blick', 'What you get with us')} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => {
            const Icon = WHY_ICONS[i] ?? Check
            return (
              <Reveal key={i} delay={i * 40}>
                <div className="flex h-full items-start gap-3 rounded-[var(--radius-card)] border border-line bg-paper p-5">
                  <Icon size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="font-medium">{w[l]}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>
    )
  }

  function HowItWorks() {
    return (
      <Section>
        <SectionHeading eyebrow={L('Ablauf', 'How it works')} title={L('So einfach geht’s', 'Simple, from idea to delivery')} />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_STEPS.map((step, i) => {
            const Icon = HOW_ICONS[i] ?? Check
            return (
              <Reveal as="li" key={i} delay={i * 50}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-accent" aria-hidden />
                    <span className="text-3xl font-semibold text-ink-soft/40">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 font-medium">{step[l]}</h3>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </Section>
    )
  }

  function Methods() {
    return (
      <Section className="bg-surface/50">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow={L('Veredelung', 'Finishing')} title={L('Druckverfahren', 'Printing methods')} subtitle={L('Wir wählen die passende Technik für Ihr Produkt.', 'We pick the right technique for your product.')} />
          <Link to="/printing-methods" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
            {t('cta.viewAll')} <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METHODS.map((m, i) => (
            <Reveal key={m.slug} delay={i * 40}>
              <TiltCard max={6}>
                <Link to="/printing-methods/$slug" params={{ slug: m.slug }} className="group block">
                  <Cover src={m.image} accent={m.accent} alt={m.name[l]} sizes="(min-width: 1024px) 23vw, 45vw" className="aspect-square w-full rounded-2xl" />
                  <p className="mt-2 text-center text-sm font-medium">{m.name[l]}</p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function BusinessBand() {
    const shots = ['t-shirts', 'hoodies', 'workwear', 'caps'].map(getProduct).filter((p): p is Product => !!p)
    return (
      <Section>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2">
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t('home.business.eyebrow')}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{t('home.business.title')}</h2>
              <p className="mt-4 max-w-xl text-muted">{t('home.business.body')}</p>
              <Link
                to="/business"
                className="mt-7 inline-flex items-center gap-2 rounded-lg flashy-gradient px-6 py-3 font-medium text-white transition active:scale-[0.985] motion-reduce:transition-none hover:opacity-90"
              >
                {t('home.business.cta')} <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {shots.map((p) => (
                <Cover key={p.slug} src={p.cover} accent={p.accent} alt={p.title[l]} sizes="(min-width: 1024px) 18vw, 45vw" className="aspect-[5/4] w-full rounded-xl" />
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
            <h3 className="mt-4 text-xl font-semibold">{t('channels.online.title')}</h3>
            <p className="mt-2 text-muted">{t('channels.online.body')}</p>
            <Link to="/contact" hash="booking-enquiry" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              {t('cta.requestQuote')} <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <Store className="text-accent" size={26} aria-hidden />
            <h3 className="mt-4 text-xl font-semibold">{t('channels.offline.title')}</h3>
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

  function GalleryTeaser() {
    // Real portfolio shots with their curated gallery alt text (content images,
    // not decoration — see catalog GALLERY).
    const shots = ['sportswear', 'geschenke', 'champagne-glass-design', 'wood-emboss']
      .map((n) => GALLERY.find((g) => g.src === withBase(`/img/${n}.webp`)))
      .filter((g): g is NonNullable<typeof g> => g != null)
    return (
      <Section className="bg-surface/50">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow={t('nav.gallery')} title={L('Ausgewählte Arbeiten', 'Selected work')} subtitle={L('Ein Querschnitt dessen, was unser Studio verlässt.', 'A cross-section of what leaves our studio.')} />
          <Link to="/gallery" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
            {t('cta.viewAll')} <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {shots.map((g, i) => (
            <Reveal key={g.src} delay={i * 40}>
              <Link to="/gallery" aria-label={g.alt[l]}>
                <img src={g.src} alt={g.alt[l]} loading="lazy" decoding="async" className="aspect-square w-full rounded-2xl border border-line object-cover" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }

  function SocialProof() {
    return (
      <Section>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1 text-accent" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="currentColor" strokeWidth={0} className={i < Math.round(RATING.value) ? '' : 'opacity-30'} />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl">{t('home.social.title')}</h2>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            {RATING.value.toLocaleString(l === 'en' ? 'en' : 'de', { minimumFractionDigits: 1 })} / 5 · {RATING.count} {t('home.social.reviews')} · Google
          </a>
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
                <blockquote className="mt-3 text-lg leading-snug">“{tm.quote[l]}”</blockquote>
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
                <span className="text-accent transition-transform group-open:rotate-45" aria-hidden>+</span>
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
        <div className="rounded-[var(--radius-card)] border border-line bg-surface-2 p-10 text-center sm:p-16">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl sm:text-4xl">{t('home.finalCta.title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t('home.finalCta.body')}</p>
          <Link
            to="/contact"
            hash="booking-enquiry"
            className="mt-8 inline-flex items-center gap-2 rounded-lg flashy-gradient px-8 py-4 font-medium text-white transition active:scale-[0.985] motion-reduce:transition-none hover:opacity-90"
          >
            {t('cta.requestQuote')} <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </Section>
    )
  }
}
