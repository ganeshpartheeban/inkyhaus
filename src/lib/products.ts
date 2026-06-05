// Product category content — drives the category routes and the Home grid.
// Bilingual (de primary). German keyword clusters from the Master Spec (doc 3, p.4).
//
// `cover` is optional: real photography is a launch TODO. Until images land,
// components render a branded CSS placeholder keyed by `accent`.
import type { Key } from './i18n'
import { withBase } from './asset'

export type Localized = { de: string; en: string }

export type ProductCategory = {
  slug: string
  /** Route path under the app. */
  path: string
  navKey: Key
  title: Localized
  /** Short card tagline. */
  tagline: Localized
  /** Primary German SEO keyword. */
  keyword: string
  /** hero/intro paragraph. */
  intro: Localized
  /** bullet "perfect for / popular options" list. */
  bullets: Localized[]
  /** OKLCH accent hue used for the placeholder art + category theming. */
  accent: number
  /** TODO: real cover image (e.g. /gallery-thumbs/<slug>-800.webp). */
  cover?: string
  order: number
}

export const CATEGORIES: ProductCategory[] = [
  {
    slug: 't-shirts',
    path: '/t-shirts',
    navKey: 'nav.tshirts',
    title: { de: 'T-Shirts bedrucken', en: 'Custom T-Shirts' },
    tagline: { de: 'Logo, Text, Foto oder Artwork', en: 'Logo, text, photo or artwork' },
    keyword: 'T-Shirt bedrucken Berlin',
    intro: {
      de: 'Gestalten Sie individuelle T-Shirts mit Ihrem Logo, Text, Foto oder Artwork — ob einzelnes Shirt oder Großauftrag für Firma, Event, Sportteam oder Familienfeier.',
      en: 'Create custom T-shirts with your logo, text, photo or artwork — whether a single shirt or a large order for your company, event, sports team or family gathering.',
    },
    bullets: [
      { de: 'Personalisierte T-Shirts', en: 'Personalized T-Shirts' },
      { de: 'Business-Logo-Shirts', en: 'Business Logo T-Shirts' },
      { de: 'Event-Shirts', en: 'Event T-Shirts' },
      { de: 'Team-Shirts', en: 'Team Shirts' },
      { de: 'Geburtstags-Shirts', en: 'Birthday Shirts' },
      { de: 'Werbeartikel', en: 'Promotional Apparel' },
    ],
    accent: 35,
    order: 1,
  },
  {
    slug: 'hoodies',
    path: '/hoodies',
    navKey: 'nav.hoodies',
    title: { de: 'Hoodies bedrucken', en: 'Custom Hoodies' },
    tagline: { de: 'Premium-Hoodies mit Ihrem Design', en: 'Premium hoodies with your design' },
    keyword: 'Hoodie bedrucken Berlin',
    intro: {
      de: 'Verwandeln Sie Ihr Design in einen hochwertigen Hoodie. Logo, Slogan, Artwork oder Text — etwas Einzigartiges für Business, Team, Schule oder die eigene Marke.',
      en: 'Turn your design into a premium hoodie. Add your logo, slogan, artwork or custom text — something unique for your business, team, school or personal brand.',
    },
    bullets: [
      { de: 'Firmenbekleidung', en: 'Company Apparel' },
      { de: 'Team-Merchandise', en: 'Team Merchandise' },
      { de: 'Schulgruppen', en: 'School Groups' },
      { de: 'Vereine', en: 'Clubs' },
      { de: 'Events', en: 'Events' },
      { de: 'Fashion-Brands', en: 'Fashion Brands' },
    ],
    accent: 280,
    order: 2,
  },
  {
    slug: 'workwear',
    path: '/workwear',
    navKey: 'nav.workwear',
    title: { de: 'Arbeitskleidung mit Logo', en: 'Workwear & Corporate Clothing' },
    tagline: { de: 'Professionell. Markenkonform.', en: 'Professional. On-brand.' },
    keyword: 'Arbeitskleidung mit Logo',
    intro: {
      de: 'Professionelle Arbeitskleidung lässt Ihr Unternehmen herausstechen. Polos, Hoodies, Jacken und T-Shirts mit Firmenlogo und Branding.',
      en: 'Professional workwear helps your business stand out. Customize polo shirts, hoodies, jackets and T-shirts with your company logo and branding.',
    },
    bullets: [
      { de: 'Restaurants', en: 'Restaurants' },
      { de: 'Cafés', en: 'Cafés' },
      { de: 'Baufirmen', en: 'Construction Companies' },
      { de: 'Reinigungsdienste', en: 'Cleaning Services' },
      { de: 'Einzelhandel', en: 'Retail Stores' },
      { de: 'Logistik', en: 'Logistics Businesses' },
      { de: 'Fitnessstudios', en: 'Fitness Studios' },
    ],
    accent: 230,
    order: 3,
  },
  {
    slug: 'sportswear',
    path: '/sportswear',
    navKey: 'nav.sportswear',
    title: { de: 'Teamwear & Trikots', en: 'Sportswear & Team Jerseys' },
    tagline: { de: 'Namen, Nummern, Sponsoren', en: 'Names, numbers, sponsors' },
    keyword: 'Sporttrikots bedrucken',
    intro: {
      de: 'Individuelle Trikots und Sportbekleidung für Ihr Team — mit Spielernamen, Nummern, Sponsorenlogos und Team-Branding für einen professionellen Look.',
      en: 'Design custom jerseys and sportswear for your team. Add player names, numbers, sponsor logos and team branding for a professional look.',
    },
    bullets: [
      { de: 'Fußballtrikots', en: 'Football Jerseys' },
      { de: 'Basketballtrikots', en: 'Basketball Jerseys' },
      { de: 'Laufshirts', en: 'Running Shirts' },
      { de: 'Trainingsbekleidung', en: 'Training Wear' },
      { de: 'Team-Hoodies', en: 'Team Hoodies' },
    ],
    accent: 150,
    order: 4,
  },
  {
    slug: 'accessories',
    path: '/accessories',
    navKey: 'nav.accessories',
    title: { de: 'Caps & Taschen', en: 'Custom Caps & Tote Bags' },
    tagline: { de: 'Accessoires für jeden Anlass', en: 'Accessories for every occasion' },
    keyword: 'Merchandise drucken',
    intro: {
      de: 'Personalisierte Accessoires für Unternehmen, Events, Promotions und den Alltag.',
      en: 'Create personalized accessories for businesses, events, promotions and everyday use.',
    },
    bullets: [
      { de: 'Baseball-Caps', en: 'Baseball Caps' },
      { de: 'Snapback-Caps', en: 'Snapback Caps' },
      { de: 'Stoffbeutel', en: 'Tote Bags' },
      { de: 'Baumwolltaschen', en: 'Cotton Bags' },
      { de: 'Turnbeutel', en: 'Drawstring Bags' },
    ],
    accent: 50,
    order: 5,
  },
]

/** Look up any product or specialty line by slug. (SPECIALTY is defined below;
 *  safe because this only runs after module initialization.) */
export function getCategory(slug: string): ProductCategory | undefined {
  return [...CATEGORIES, ...SPECIALTY].find((c) => c.slug === slug)
}

// ── Print techniques (Build Brief / doc 2 p.4, doc 3 §13) ───────────────────
export type Technique = {
  slug: string
  name: Localized
  description: Localized
  accent: number
  image?: string
}

export const TECHNIQUES: Technique[] = [
  {
    slug: 'full-color',
    name: { de: 'Vollfarbdruck', en: 'Classic Full-Color Print' },
    description: { de: 'Kräftige, lebendige Farben für Logos, Fotos und detaillierte Artworks.', en: 'Bright, vibrant colors for logos, photos and detailed artwork.' },
    accent: 35,
  },
  {
    slug: 'puff',
    name: { de: 'Puff-Druck', en: 'Puff Print' },
    description: { de: 'Erhabener 3D-Effekt mit Textur und Tiefe.', en: 'Raised 3D effect that adds texture and depth.' },
    accent: 12,
  },
  {
    slug: 'glitter',
    name: { de: 'Glitzerdruck', en: 'Glitter Print' },
    description: { de: 'Funkelndes Finish für auffällige Designs.', en: 'Sparkling finish for eye-catching designs.' },
    accent: 320,
  },
  {
    slug: 'metallic',
    name: { de: 'Metallic-Finish', en: 'Metallic Finish' },
    description: { de: 'Edle Gold- und Silbereffekte.', en: 'Premium gold and silver effects.' },
    accent: 85,
  },
  {
    slug: 'glow',
    name: { de: 'Glow-in-the-Dark', en: 'Glow-in-the-Dark' },
    description: { de: 'Leuchtet im Dunkeln nach — auffällig bei Nacht.', en: 'Glows in the dark — eye-catching at night.' },
    accent: 145,
  },
  {
    slug: 'uv',
    name: { de: 'UV-Druck', en: 'UV Print' },
    description: { de: 'Brillante, langlebige Drucke auf vielen Materialien.', en: 'Brilliant, durable prints on many materials.' },
    accent: 265,
  },
]

// ── Specialty production lines (real Inkyhaus catalogue, from inkyhaus.de) ────
// Same shape as ProductCategory; rendered via <CategoryPage variant="specialty">.
export const SPECIALTY: ProductCategory[] = [
  {
    slug: 'lasergravur',
    path: '/lasergravur',
    navKey: 'nav.engraving',
    title: { de: 'Lasergravur & Personalisierung', en: 'Laser Engraving & Personalization' },
    tagline: { de: 'Holz, Glas, Metall & mehr', en: 'Wood, glass, metal & more' },
    keyword: 'Lasergravur Berlin',
    intro: {
      de: 'Präzise Lasergravur auf Holz, Glas und Metall — für Schilder, Typenschilder, Geschenke und individuelle Einzelstücke.',
      en: 'Precise laser engraving on wood, glass and metal — for signs, nameplates, gifts and one-off pieces.',
    },
    bullets: [
      { de: 'Holz', en: 'Wood' },
      { de: 'Glas', en: 'Glass' },
      { de: 'Metall', en: 'Metal' },
      { de: 'Schilder & Typenschilder', en: 'Signs & nameplates' },
      { de: 'Personalisierte Geschenke', en: 'Personalized gifts' },
    ],
    accent: 60,
    order: 20,
  },
  {
    slug: '3d-druck',
    path: '/3d-druck',
    navKey: 'nav.print3d',
    title: { de: '3D-Druck', en: '3D Printing' },
    tagline: { de: 'Prototypen & Sonderanfertigungen', en: 'Prototypes & custom parts' },
    keyword: '3D-Druck Berlin',
    intro: {
      de: 'Prototypen, Sonderanfertigungen und Funktionsteile aus dem 3D-Drucker — von der Idee zum fertigen Bauteil.',
      en: 'Prototypes, custom builds and functional parts from the 3D printer — from idea to finished part.',
    },
    bullets: [
      { de: 'Prototypen', en: 'Prototypes' },
      { de: 'Sonderanfertigungen', en: 'Custom builds' },
      { de: 'Funktionsteile', en: 'Functional parts' },
    ],
    accent: 205,
    order: 21,
  },
  {
    slug: 'werbetechnik',
    path: '/werbetechnik',
    navKey: 'nav.signage',
    title: { de: 'Werbetechnik & Großformatdruck', en: 'Signage & Large-Format Printing' },
    tagline: { de: 'Banner, Displays & Print', en: 'Banners, displays & print' },
    keyword: 'Werbetechnik Berlin',
    intro: {
      de: 'Großformatige Werbung und Printprodukte: Banner, Roll-Ups, Poster, Messedisplays, Flyer und Visitenkarten.',
      en: 'Large-format advertising and print: banners, roll-ups, posters, trade-show displays, flyers and business cards.',
    },
    bullets: [
      { de: 'Banner', en: 'Banners' },
      { de: 'Roll-Ups', en: 'Roll-ups' },
      { de: 'Poster', en: 'Posters' },
      { de: 'Messedisplays', en: 'Trade-show displays' },
      { de: 'Flyer', en: 'Flyers' },
      { de: 'Visitenkarten (auch Metall)', en: 'Business cards (incl. metal)' },
    ],
    accent: 15,
    order: 22,
  },
  {
    slug: 'aufkleber',
    path: '/aufkleber',
    navKey: 'nav.stickers',
    title: { de: 'Aufkleber & Vinyl-Grafiken', en: 'Stickers & Vinyl Graphics' },
    tagline: { de: 'Folie, Wandtattoos & Logo-Vinyl', en: 'Film, wall decals & logo vinyl' },
    keyword: 'Aufkleber drucken Berlin',
    intro: {
      de: 'Aufkleber, Fensterfolie, Wandtattoos und Logo-Vinyl — für Schaufenster, Fahrzeuge, Wände und Branding.',
      en: 'Stickers, window film, wall decals and logo vinyl — for storefronts, vehicles, walls and branding.',
    },
    bullets: [
      { de: 'Aufkleber', en: 'Stickers' },
      { de: 'Fensterfolie', en: 'Window film' },
      { de: 'Wandtattoos', en: 'Wall decals' },
      { de: 'Logo-Vinyl', en: 'Logo vinyl' },
    ],
    accent: 330,
    order: 23,
  },
  {
    slug: 'geschenke',
    path: '/geschenke',
    navKey: 'nav.gifts',
    title: { de: 'Personalisierte Geschenke & Fotoprodukte', en: 'Personalized Gifts & Photo Products' },
    tagline: { de: 'Tassen, Metal Prints & Tags', en: 'Mugs, metal prints & tags' },
    keyword: 'Personalisierte Geschenke Berlin',
    intro: {
      de: 'Sublimations-Tassen mit Foto- und Logodruck, hochwertige Metal Photo Prints und personalisierte Anhänger.',
      en: 'Sublimation mugs with photo and logo print, premium metal photo prints and personalized tags.',
    },
    bullets: [
      { de: 'Sublimations-Tassen', en: 'Sublimation mugs' },
      { de: 'Metal Photo Prints', en: 'Metal photo prints' },
      { de: 'Anhänger / Tags', en: 'Tags / pendants' },
      { de: 'Foto- & Logodruck', en: 'Photo & logo print' },
    ],
    accent: 300,
    order: 24,
  },
  {
    slug: 'trikot-restauration',
    path: '/trikot-restauration',
    navKey: 'nav.restoration',
    title: { de: 'Trikot-Restauration', en: 'Jersey Restoration' },
    tagline: { de: 'Namen & Nummern auffrischen', en: 'Refresh names & numbers' },
    keyword: 'Trikot Restauration Berlin',
    intro: {
      de: 'Namen- und Nummern-Restauration sowie Nachbesserung bestehender Trikots — geben Sie Ihrem Lieblingstrikot neuen Glanz.',
      en: 'Name and number restoration plus touch-ups for existing jerseys — give your favorite jersey new life.',
    },
    bullets: [
      { de: 'Namen-Restauration', en: 'Name restoration' },
      { de: 'Nummern-Restauration', en: 'Number restoration' },
      { de: 'Nachbesserung bestehender Trikots', en: 'Touch-ups for existing jerseys' },
    ],
    accent: 175,
    order: 25,
  },
  {
    slug: 'pokale-medaillen',
    path: '/pokale-medaillen',
    navKey: 'nav.trophies',
    title: { de: 'Pokale & Medaillen Gravur', en: 'Trophy & Medal Engraving' },
    tagline: { de: 'Mit Gravur, Text oder Logo', en: 'With engraving, text or logo' },
    keyword: 'Pokale Gravur Berlin',
    intro: {
      de: 'Pokale und Medaillen mit individueller Gravur, Text oder Logo — für Turniere, Vereine und Auszeichnungen.',
      en: 'Trophies and medals with custom engraving, text or logo — for tournaments, clubs and awards.',
    },
    bullets: [
      { de: 'Pokale', en: 'Trophies' },
      { de: 'Medaillen', en: 'Medals' },
      { de: 'Gravur mit Text', en: 'Text engraving' },
      { de: 'Gravur mit Logo', en: 'Logo engraving' },
    ],
    accent: 90,
    order: 26,
  },
  {
    slug: 'werbeartikel',
    path: '/werbeartikel',
    navKey: 'nav.promo',
    title: { de: 'Werbeartikel & Branding', en: 'Promotional Items & Branding' },
    tagline: { de: 'Firmengeschenke & Event-Merch', en: 'Corporate gifts & event merch' },
    keyword: 'Werbeartikel bedrucken Berlin',
    intro: {
      de: 'Firmengeschenke, Event-Merchandise und Branding-Produkte, die im Gedächtnis bleiben.',
      en: 'Corporate gifts, event merchandise and branding products that stay memorable.',
    },
    bullets: [
      { de: 'Firmengeschenke', en: 'Corporate gifts' },
      { de: 'Event-Merch', en: 'Event merch' },
      { de: 'Branding-Produkte', en: 'Branding products' },
    ],
    accent: 255,
    order: 27,
  },
]

/** Every product/service line. */
export const ALL_LINES: ProductCategory[] = [...CATEGORIES, ...SPECIALTY]

// Real Inkyhaus photography, mapped ONLY to the sections it genuinely depicts
// (from inkyhaus.de). Lines without a real photo intentionally keep `cover`
// undefined and render on-brand generative art — no mismatched stock.
// Drop-in override: set a line's `cover` to a new /img/<name>.webp when you have it.
const REAL_COVERS: Record<string, string> = {
  geschenke: '/img/geschenke.webp', // personalized gift set (keepsake box)
  lasergravur: '/img/lasergravur.webp', // etched glassware
  werbetechnik: '/img/werbetechnik.webp', // metal business card
}
// Matched lines use real Inkyhaus photos; the rest use a relevant, license-free
// photo (Openverse) at /img/<slug>.webp. Replace any file to override.
for (const line of ALL_LINES) {
  if (!line.cover) line.cover = withBase(REAL_COVERS[line.slug] ?? `/img/${line.slug}.webp`)
}
for (const tech of TECHNIQUES) {
  if (!tech.image) tech.image = withBase(`/img/tech-${tech.slug}.webp`)
}
