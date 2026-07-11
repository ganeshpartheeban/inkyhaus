// SEO helpers: JSON-LD builders + per-page head (meta/OG/twitter/canonical).
// Schemas per Build Brief §04, adapted for an apparel business (Service/FAQ over EXIF).
import { SITE } from './site-config'
import { OG_LOCALE, type Locale } from './i18n'
import { FAQS, type Faq } from './content'

const ORG_ID = `${SITE.url}/#organization`

export type JsonLd = Record<string, unknown>

/** Single business entity: ProfessionalService (a LocalBusiness subtype) carrying
 *  the org identity + all local-business signals. One node, one @id — product and
 *  method pages reference it via `provider`. Emitted site-wide from __root,
 *  localized to match the page's SSR language. */
export function buildLocalBusinessLD(locale: Locale = 'de'): JsonLd {
  const en = locale === 'en'
  const sameAs = [SITE.social.instagram, SITE.social.facebook].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og-hero.jpg`,
    description: en
      ? 'All-in-one personalization & print studio in Berlin Friedrichshain: textile printing (DTF, HTV), laser engraving, sublimation, stickers & vinyl and 3D printing.'
      : 'All-in-One Personalisierungs- & Druckstudio in Berlin Friedrichshain: Textildruck (DTF, HTV), Lasergravur, Sublimation, Sticker & Vinyl und 3D-Druck.',
    ...(SITE.email ? { email: [SITE.email, SITE.emailAlt].filter(Boolean) } : {}),
    ...(SITE.phone ? { telephone: [SITE.phone, SITE.phone2].filter(Boolean) } : {}),
    priceRange: '€€',
    areaServed: { '@type': 'City', name: 'Berlin' },
    paymentAccepted: 'NFC mobile payments',
    publicAccess: true,
    amenityFeature: [
      'Wi-Fi',
      'Restroom',
      'Gender-neutral toilets',
      'Assisted listening devices',
      'In-store pick-up',
      'On-site services',
      'Delivery',
      'LGBTQ+ friendly',
      'Transgender safe space',
    ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    hasMap: SITE.mapsUrl,
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    address: {
      '@type': 'PostalAddress',
      ...(SITE.street ? { streetAddress: SITE.street } : {}),
      ...(SITE.postalCode ? { postalCode: SITE.postalCode } : {}),
      addressLocality: SITE.city,
      // City-state: the administrative region for a Berlin address is Berlin itself
      // (the district belongs in streetAddress/locality context, not addressRegion).
      addressRegion: 'Berlin',
      addressCountry: SITE.country,
    },
    makesOffer: (en
      ? [
          'Textile Printing (DTF & HTV)',
          'Laser Engraving',
          'Sublimation Printing',
          'Embroidery',
          'Stickers & Vinyl',
          '3D Printing',
          'Express Printing',
        ]
      : [
          'Textildruck (DTF & HTV)',
          'Lasergravur',
          'Sublimationsdruck',
          'Stickerei',
          'Sticker & Vinyl',
          '3D-Druck',
          'Express-Druck',
        ]
    ).map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    ...(sameAs.length ? { sameAs } : {}),
  }
}

/** BreadcrumbList — for secondary routes. Pass names in the SSR locale (German). */
export function buildBreadcrumbLD(crumbs: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  }
}

/** Service — for product & printing-method detail pages. The business is
 *  quote-based (no fixed prices), so Service markup is the honest fit; Product
 *  markup without offers/reviews is ineligible for rich results anyway. */
export function buildOfferedServiceLD(input: { name: string; description: string; path: string; image?: string }): JsonLd {
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${SITE.url}${input.image.startsWith('/') ? '' : '/'}${input.image}`
    : `${SITE.url}/og-hero.jpg`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    serviceType: input.name,
    description: input.description,
    image,
    url: `${SITE.url}${input.path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Berlin' },
  }
}

/** FAQPage — emit on ONE page only (/faq) and only for content visible there. */
export function buildFaqLD(locale: Locale, items: Faq[] = FAQS): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q[locale === 'en' ? 'en' : 'de'],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale === 'en' ? 'en' : 'de'] },
    })),
  }
}

/** ImageGallery (repurposed) — galleries / portfolio. */
export function buildImageGalleryLD(
  images: Array<{ url: string; caption?: string; location?: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.url.startsWith('http') ? img.url : `${SITE.url}${img.url}`,
      ...(img.caption ? { caption: img.caption } : {}),
      ...(img.location ? { contentLocation: img.location } : {}),
    })),
  }
}

// ── Per-page <head> builder ─────────────────────────────────────────────────
export type PageHeadInput = {
  title: string
  description: string
  /** Route path, no domain, e.g. "/hoodies". */
  path: string
  locale: Locale
  /** OG image path or absolute URL. Defaults to /og-hero.jpg. */
  ogImage?: string
  ogImageAlt?: string
  noindex?: boolean
}

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE.url}${p}`)
const absPage = (p: string) => abs(p === '/' ? '' : p)

/** Returns { meta, links } ready to spread into a TanStack Route `head()`.
 *  German pages live at /<path>, English at /en/<path> — each variant is SSR'd
 *  in its own language, so we emit a reciprocal hreflang cluster (de ↔ en,
 *  x-default → de) with distinct URLs. Noindex pages get canonical only. */
export function pageHead(input: PageHeadInput) {
  const { title, description, path, locale, ogImage = '/og-hero.jpg', ogImageAlt, noindex } = input
  const canonical = absPage(path)
  const image = abs(ogImage)

  const isEn = path === '/en' || path.startsWith('/en/')
  const dePath = isEn ? (path === '/en' ? '/' : path.slice(3)) : path
  const enPath = isEn ? path : path === '/' ? '/en' : `/en${path}`

  const meta = [
    { title },
    { name: 'description', content: description },
    {
      name: 'robots',
      // noindex pages keep `follow` so internal link equity still flows through.
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:alt', content: ogImageAlt ?? title },
    { property: 'og:locale', content: OG_LOCALE[locale] },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: ogImageAlt ?? title },
  ]

  const links = [
    { rel: 'canonical', href: canonical },
    // Reciprocal hreflang — only for indexable pages (legal pages are DE-only + noindex).
    ...(noindex
      ? []
      : [
          { rel: 'alternate', hrefLang: 'de', href: absPage(dePath) },
          { rel: 'alternate', hrefLang: 'en', href: absPage(enPath) },
          { rel: 'alternate', hrefLang: 'x-default', href: absPage(dePath) },
        ]),
  ]

  return { meta, links }
}
