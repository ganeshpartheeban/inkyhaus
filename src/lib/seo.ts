// SEO helpers: JSON-LD builders + per-page head (meta/OG/twitter/canonical/hreflang).
// Schemas per Build Brief §04, adapted for an apparel business (Service/FAQ over EXIF).
import { SITE } from './site-config'
import { ACTIVE_LOCALES, OG_LOCALE, type Locale } from './i18n'
import { FAQS } from './content'

const ORG_ID = `${SITE.url}/#organization`
const PERSON_ID = `${SITE.url}/#founder`

export type JsonLd = Record<string, unknown>

/** Organization — single source, @id referenced elsewhere. */
export function buildOrganizationLD(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og-hero.jpg`,
    description: 'Premium custom apparel & textile printing in Berlin Friedrichshain.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.district,
      addressCountry: SITE.country,
      ...(SITE.street ? { streetAddress: SITE.street } : {}),
      ...(SITE.postalCode ? { postalCode: SITE.postalCode } : {}),
    },
    ...(SITE.email ? { email: SITE.email } : {}),
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
  }
}

/** Person (founder) referenced under the org. */
export function buildPersonLD(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
    worksFor: { '@id': ORG_ID },
  }
}

/** ProfessionalService (printing studio) — root-level offering. */
export function buildServiceLD(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#service`,
    name: SITE.name,
    parentOrganization: { '@id': ORG_ID },
    url: SITE.url,
    image: `${SITE.url}/og-hero.jpg`,
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
      addressRegion: SITE.district,
      addressCountry: SITE.country,
    },
    makesOffer: ['Custom T-Shirts', 'Custom Hoodies', 'Workwear', 'Team Jerseys', 'Accessories', 'Express Printing'].map(
      (name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } }),
    ),
  }
}

/** BreadcrumbList — for secondary routes. */
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

/** FAQPage — built from the shared FAQ content for a given locale. */
export function buildFaqLD(locale: Locale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
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

/** AggregateRating + individual Reviews wrapped under the org @id. Emit ONLY with
 *  real, verifiable ratings — fabricated review markup violates Google's policies. */
export function buildAggregateRatingLD(
  value: number,
  count: number,
  reviews: Array<{ author: string; body: string }> = [],
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: value,
      reviewCount: count,
      bestRating: 5,
    },
    ...(reviews.length
      ? {
          review: reviews.map((rv) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: rv.author },
            reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
            reviewBody: rv.body,
          })),
        }
      : {}),
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

/** Returns { meta, links } ready to spread into a TanStack Route `head()`. */
export function pageHead(input: PageHeadInput) {
  const { title, description, path, locale, ogImage = '/og-hero.jpg', ogImageAlt, noindex } = input
  const canonical = abs(path === '/' ? '' : path)
  const image = abs(ogImage)

  const meta = [
    { title },
    { name: 'description', content: description },
    {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
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
    ...ACTIVE_LOCALES.filter((l) => l !== locale).map((l) => ({
      property: 'og:locale:alternate',
      content: OG_LOCALE[l],
    })),
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]

  const links = [
    { rel: 'canonical', href: canonical },
    // hreflang alternates (query-less; locale handled client-side, so self-referential
    // alternates + x-default keep crawlers happy without per-locale URLs yet).
    ...ACTIVE_LOCALES.map((l) => ({ rel: 'alternate', hrefLang: l, href: canonical })),
    { rel: 'alternate', hrefLang: 'x-default', href: canonical },
  ]

  return { meta, links }
}
