// ── Product catalog (revamped IA) ────────────────────────────────────────────
// Single source of truth for the two product hubs (Textile Printing &
// Promotional Products), their products, the printing methods, and the gallery.
// Drives the hub pages, the dynamic /…/$slug product pages, the methods pages,
// the gallery filters, the header nav and the footer.
//
// Content is bilingual (de primary). Products without a real photo fall back to
// branded placeholder art via <Cover>. Replace `cover`/`gallery` paths and flesh
// out copy over time.
import { withBase } from './asset'

export type Localized = { de: string; en: string }
export type HubSlug = 'textile-printing' | 'promotional-products'
export type FaqItem = { q: Localized; a: Localized }
export type Swatch = { name: string; hex: string }

export type Hub = {
  slug: HubSlug
  path: string
  title: Localized
  tagline: Localized
  intro: Localized
}

export type PromoGroup = { slug: string; label: Localized }

export type Product = {
  slug: string
  hub: HubSlug
  /** Promo grouping (undefined for textile products, which render as one grid). */
  group?: string
  title: Localized
  tagline: Localized
  description: Localized
  highlights: Localized[]
  /** Applicable printing-method slugs. */
  methods: string[]
  colours?: Swatch[]
  sizes?: string[]
  minOrder: number
  deliveryTime: Localized
  faq: FaqItem[]
  accent: number
  cover?: string
  gallery?: string[]
}

export type Method = {
  slug: string
  name: Localized
  tagline: Localized
  description: Localized
  bestFor: Localized
  accent: number
  image?: string
}

// ── Hubs ─────────────────────────────────────────────────────────────────────
export const HUBS: Record<HubSlug, Hub> = {
  'textile-printing': {
    slug: 'textile-printing',
    path: '/textile-printing',
    title: { de: 'Textildruck', en: 'Textile Printing' },
    tagline: { de: 'Bekleidung mit Ihrem Design', en: 'Apparel with your design' },
    intro: {
      de: 'Vom einzelnen personalisierten Shirt bis zum großen Firmenauftrag — hochwertig bedruckte und bestickte Bekleidung, lokal in Berlin produziert.',
      en: 'From a single personalised shirt to large corporate orders — premium printed and embroidered apparel, produced locally in Berlin.',
    },
  },
  'promotional-products': {
    slug: 'promotional-products',
    path: '/promotional-products',
    title: { de: 'Werbeartikel & Geschenke', en: 'Promotional Products' },
    tagline: { de: 'Branding, das im Gedächtnis bleibt', en: 'Branding that stays memorable' },
    intro: {
      de: 'Individuell veredelte Werbeartikel, Firmengeschenke und personalisierte Geschenke — für Events, Teams, Kunden und besondere Anlässe.',
      en: 'Custom-branded promotional items, corporate gifts and personalised presents — for events, teams, clients and special occasions.',
    },
  },
}

// Promo sub-groups, in display order.
export const PROMO_GROUPS: PromoGroup[] = [
  { slug: 'drinkware', label: { de: 'Trinkgefäße', en: 'Drinkware' } },
  { slug: 'office', label: { de: 'Büro-Essentials', en: 'Office Essentials' } },
  { slug: 'promo-items', label: { de: 'Werbeartikel', en: 'Promotional Items' } },
  { slug: 'corporate-gifts', label: { de: 'Firmengeschenke', en: 'Corporate Gifts' } },
  { slug: 'conference', label: { de: 'Konferenz & Event', en: 'Conference & Event Merchandise' } },
  { slug: 'wedding', label: { de: 'Hochzeit & Personalisiert', en: 'Wedding & Personalized Gifts' } },
]

// ── Shared building blocks ────────────────────────────────────────────────────
const COLOURS: Swatch[] = [
  { name: 'White', hex: '#f8f8f6' },
  { name: 'Black', hex: '#111114' },
  { name: 'Navy', hex: '#1f2a44' },
  { name: 'Grey', hex: '#8b9098' },
  { name: 'Red', hex: '#c0392b' },
  { name: 'Royal', hex: '#2f4bd8' },
  { name: 'Green', hex: '#2e7d52' },
  { name: 'Sand', hex: '#d8c9a3' },
]
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

const FAST: Localized = { de: '24–72 Stunden, Express möglich', en: '24–72 hours, express available' }
const BULK: Localized = { de: 'nach Menge, Express möglich', en: 'depending on quantity, express available' }

const APPAREL_FAQ: FaqItem[] = [
  {
    q: { de: 'Gibt es eine Mindestbestellmenge?', en: 'Is there a minimum order?' },
    a: { de: 'Nein — Sie bestellen ab einem Stück, vom Einzelstück bis zum Großauftrag.', en: 'No — order from a single piece, from one-offs to large runs.' },
  },
  {
    q: { de: 'Welche Druckverfahren sind möglich?', en: 'Which methods can I choose?' },
    a: { de: 'Je nach Produkt DTF-Druck, Stickerei oder Sublimation — wir beraten Sie zum passenden Verfahren.', en: 'Depending on the product: DTF printing, embroidery or sublimation — we advise on the right method.' },
  },
  {
    q: { de: 'In welchem Format soll ich mein Artwork liefern?', en: 'What artwork format should I send?' },
    a: { de: 'Am besten als Vektordatei (PDF, SVG, AI/EPS) oder hochauflösendes PNG. Wir prüfen die Datei vor dem Druck.', en: 'Ideally a vector file (PDF, SVG, AI/EPS) or a high-resolution PNG. We check the file before printing.' },
  },
]

const PROMO_FAQ: FaqItem[] = [
  {
    q: { de: 'Ab welcher Menge produziert ihr?', en: 'What quantities do you produce?' },
    a: { de: 'Von kleinen Auflagen bis zu großen Event- und Firmenmengen — sagen Sie uns Ihre Stückzahl.', en: 'From small runs to large event and corporate volumes — just tell us your quantity.' },
  },
  {
    q: { de: 'Wie wird mein Logo aufgebracht?', en: 'How is my logo applied?' },
    a: { de: 'Per Lasergravur, Druck oder Sublimation — abhängig vom Material des Produkts.', en: 'Via laser engraving, print or sublimation — depending on the product material.' },
  },
  {
    q: { de: 'Wie lange dauert die Lieferung?', en: 'How long is delivery?' },
    a: { de: 'Die Lieferzeit richtet sich nach Produkt und Menge; Express ist auf Anfrage möglich.', en: 'Delivery time depends on product and quantity; express is available on request.' },
  },
]

const c = (path: string) => withBase(path)

// ── Textile Printing products ─────────────────────────────────────────────────
const TEXTILE: Product[] = [
  {
    slug: 't-shirts', hub: 'textile-printing', accent: 35,
    title: { de: 'T-Shirts bedrucken', en: 'Custom T-Shirts' },
    tagline: { de: 'Logo, Text, Foto oder Artwork', en: 'Logo, text, photo or artwork' },
    description: {
      de: 'Individuelle T-Shirts mit Ihrem Logo, Text, Foto oder Artwork — für Firma, Event, Sportteam oder Familienfeier. Hochwertige Baumwolle, langlebiger Druck.',
      en: 'Custom T-shirts with your logo, text, photo or artwork — for companies, events, sports teams or family gatherings. Premium cotton, durable print.',
    },
    highlights: [
      { de: 'Personalisierte & Business-Logo-Shirts', en: 'Personalised & business logo shirts' },
      { de: 'Event- und Team-Shirts', en: 'Event and team shirts' },
      { de: 'Ab einem Stück', en: 'From a single piece' },
    ],
    methods: ['dtf', 'embroidery', 'sublimation'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ, cover: c('/img/t-shirts.webp'),
  },
  {
    slug: 'polo-shirts', hub: 'textile-printing', accent: 200,
    title: { de: 'Poloshirts bedrucken', en: 'Custom Polo Shirts' },
    tagline: { de: 'Gepflegter Auftritt mit Logo', en: 'A polished, on-brand look' },
    description: {
      de: 'Bestickte oder bedruckte Poloshirts für einen professionellen, gepflegten Auftritt — ideal für Teams, Gastronomie und Firmenkleidung.',
      en: 'Embroidered or printed polo shirts for a professional, polished look — ideal for teams, hospitality and corporate wear.',
    },
    highlights: [
      { de: 'Dezente Logostickerei', en: 'Subtle logo embroidery' },
      { de: 'Team- & Firmenkleidung', en: 'Team & corporate wear' },
    ],
    methods: ['embroidery', 'dtf'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ,
  },
  {
    slug: 'hoodies', hub: 'textile-printing', accent: 280,
    title: { de: 'Hoodies bedrucken', en: 'Custom Hoodies' },
    tagline: { de: 'Premium-Hoodies mit Ihrem Design', en: 'Premium hoodies with your design' },
    description: {
      de: 'Verwandeln Sie Ihr Design in einen hochwertigen Hoodie — Logo, Slogan oder Artwork für Business, Team, Schule oder die eigene Marke.',
      en: 'Turn your design into a premium hoodie — logo, slogan or artwork for business, team, school or your own brand.',
    },
    highlights: [
      { de: 'Firmen- & Team-Merchandise', en: 'Company & team merchandise' },
      { de: 'Schulgruppen, Vereine, Fashion-Brands', en: 'School groups, clubs, fashion brands' },
    ],
    methods: ['dtf', 'embroidery'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ, cover: c('/img/hoodies.webp'),
  },
  {
    slug: 'sweatshirts', hub: 'textile-printing', accent: 320,
    title: { de: 'Sweatshirts bedrucken', en: 'Custom Sweatshirts' },
    tagline: { de: 'Bequem, warm, markenkonform', en: 'Comfortable, warm, on-brand' },
    description: {
      de: 'Bedruckte oder bestickte Sweatshirts für Teams, Events und Merchandise — angenehm zu tragen und langlebig veredelt.',
      en: 'Printed or embroidered sweatshirts for teams, events and merchandise — comfortable to wear and durably finished.',
    },
    highlights: [{ de: 'Team- & Event-Bekleidung', en: 'Team & event apparel' }],
    methods: ['dtf', 'embroidery'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ,
  },
  {
    slug: 'jackets', hub: 'textile-printing', accent: 230,
    title: { de: 'Jacken bedrucken', en: 'Custom Jackets' },
    tagline: { de: 'Softshell, Fleece & mehr', en: 'Softshell, fleece & more' },
    description: {
      de: 'Jacken mit Logo für Firmen, Vereine und Events — Stickerei für ein besonders hochwertiges, langlebiges Ergebnis.',
      en: 'Logo jackets for companies, clubs and events — embroidery for an especially premium, durable finish.',
    },
    highlights: [{ de: 'Ideal für Stickerei', en: 'Ideal for embroidery' }],
    methods: ['embroidery', 'dtf'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ,
  },
  {
    slug: 'workwear', hub: 'textile-printing', accent: 210,
    title: { de: 'Arbeitskleidung mit Logo', en: 'Workwear' },
    tagline: { de: 'Professionell. Markenkonform.', en: 'Professional. On-brand.' },
    description: {
      de: 'Professionelle Arbeitskleidung mit Firmenlogo — Polos, Hoodies, Jacken und Shirts für Gastronomie, Handwerk, Handel und Dienstleistung.',
      en: 'Professional workwear with your company logo — polos, hoodies, jackets and shirts for hospitality, trades, retail and services.',
    },
    highlights: [
      { de: 'Restaurants, Cafés, Baufirmen', en: 'Restaurants, cafés, construction' },
      { de: 'Reinigung, Einzelhandel, Logistik', en: 'Cleaning, retail, logistics' },
    ],
    methods: ['embroidery', 'dtf'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ, cover: c('/img/workwear.webp'),
  },
  {
    slug: 'sportswear', hub: 'textile-printing', accent: 150,
    title: { de: 'Teamwear & Trikots', en: 'Sportswear & Team Jerseys' },
    tagline: { de: 'Namen, Nummern, Sponsoren', en: 'Names, numbers, sponsors' },
    description: {
      de: 'Individuelle Trikots und Sportbekleidung mit Spielernamen, Nummern und Sponsorenlogos — im Sublimationsdruck für vollflächige, langlebige Designs.',
      en: 'Custom jerseys and sportswear with player names, numbers and sponsor logos — sublimation-printed for full-coverage, durable designs.',
    },
    highlights: [
      { de: 'Fußball, Basketball, Laufsport', en: 'Football, basketball, running' },
      { de: 'Vollflächiger Sublimationsdruck', en: 'Full-coverage sublimation print' },
    ],
    methods: ['sublimation', 'dtf'], colours: COLOURS, sizes: SIZES,
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ, cover: c('/img/sportswear.webp'),
  },
  {
    slug: 'tote-bags', hub: 'textile-printing', accent: 50,
    title: { de: 'Stoffbeutel bedrucken', en: 'Custom Tote Bags' },
    tagline: { de: 'Nachhaltiges Branding', en: 'Sustainable branding' },
    description: {
      de: 'Bedruckte Baumwoll- und Stoffbeutel für Promotions, Events und den Verkauf — nachhaltiges Branding zum Mitnehmen.',
      en: 'Printed cotton and canvas tote bags for promotions, events and retail — sustainable branding to carry around.',
    },
    highlights: [{ de: 'Promotions, Events, Retail', en: 'Promotions, events, retail' }],
    methods: ['dtf', 'embroidery'],
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ, cover: c('/img/lumina-bag.webp'),
  },
  {
    slug: 'caps', hub: 'textile-printing', accent: 25,
    title: { de: 'Caps besticken', en: 'Custom Caps' },
    tagline: { de: 'Baseball, Snapback & mehr', en: 'Baseball, snapback & more' },
    description: {
      de: 'Bestickte oder mit Patch veredelte Caps — der Klassiker fürs Team-Branding, Events und den Merchandise-Verkauf.',
      en: 'Embroidered or patch-finished caps — the classic for team branding, events and merchandise.',
    },
    highlights: [{ de: 'Stickerei oder Leder-Patch', en: 'Embroidery or leather patch' }],
    methods: ['embroidery'],
    minOrder: 1, deliveryTime: FAST, faq: APPAREL_FAQ, cover: c('/img/cap-stiched.webp'),
  },
]

// ── Promotional Products ──────────────────────────────────────────────────────
const PROMO: Product[] = [
  {
    slug: 'mugs', hub: 'promotional-products', group: 'drinkware', accent: 300,
    title: { de: 'Tassen bedrucken', en: 'Custom Mugs' },
    tagline: { de: 'Foto- & Logodruck', en: 'Photo & logo print' },
    description: { de: 'Sublimations-Tassen mit Foto- oder Logodruck — beliebtes Werbemittel und persönliches Geschenk.', en: 'Sublimation mugs with photo or logo print — a popular giveaway and a personal gift.' },
    highlights: [{ de: 'Foto, Logo oder Text', en: 'Photo, logo or text' }],
    methods: ['sublimation'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/geschenke.webp'),
  },
  {
    slug: 'water-bottles', hub: 'promotional-products', group: 'drinkware', accent: 195,
    title: { de: 'Trinkflaschen', en: 'Water Bottles' },
    tagline: { de: 'Graviert oder bedruckt', en: 'Engraved or printed' },
    description: { de: 'Edelstahl- und Kunststoffflaschen mit Logo — per Lasergravur oder Druck veredelt.', en: 'Stainless-steel and plastic bottles with your logo — finished by laser engraving or print.' },
    highlights: [{ de: 'Edelstahl oder Kunststoff', en: 'Stainless steel or plastic' }],
    methods: ['laser-engraving', 'sublimation'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ,
  },
  {
    slug: 'pens', hub: 'promotional-products', group: 'office', accent: 40,
    title: { de: 'Kugelschreiber & Stifte', en: 'Pens' },
    tagline: { de: 'Graviert mit Ihrem Logo', en: 'Engraved with your logo' },
    description: { de: 'Hochwertige Stifte mit Logo-Gravur — der Klassiker unter den Werbeartikeln, auch als edles Set.', en: 'Premium pens with logo engraving — the classic promotional item, also available as an elegant set.' },
    highlights: [{ de: 'Metall & Holz', en: 'Metal & wood' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/embossed-pen.webp'),
  },
  {
    slug: 'notebooks', hub: 'promotional-products', group: 'office', accent: 20,
    title: { de: 'Notizbücher', en: 'Notebooks' },
    tagline: { de: 'Logo-Prägung & Druck', en: 'Logo debossing & print' },
    description: { de: 'Notizbücher mit Logo — geprägt, graviert oder bedruckt. Ideal für Onboarding-Kits und Events.', en: 'Notebooks with your logo — debossed, engraved or printed. Ideal for onboarding kits and events.' },
    highlights: [{ de: 'Onboarding-Kits & Events', en: 'Onboarding kits & events' }],
    methods: ['laser-engraving', 'dtf'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ,
  },
  {
    slug: 'keychains', hub: 'promotional-products', group: 'promo-items', accent: 90,
    title: { de: 'Schlüsselanhänger', en: 'Keychains' },
    tagline: { de: 'Klein, wirkungsvoll, personalisiert', en: 'Small, effective, personalised' },
    description: { de: 'Personalisierte Schlüsselanhänger aus Metall, Holz oder Acryl — graviert mit Namen oder Logo.', en: 'Personalised keychains in metal, wood or acrylic — engraved with a name or logo.' },
    highlights: [{ de: 'Metall, Holz oder Acryl', en: 'Metal, wood or acrylic' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ,
  },
  {
    slug: 'corporate-gift-sets', hub: 'promotional-products', group: 'corporate-gifts', accent: 255,
    title: { de: 'Firmengeschenk-Sets', en: 'Corporate Gift Sets' },
    tagline: { de: 'Kuratierte Sets mit Branding', en: 'Curated, branded sets' },
    description: { de: 'Zusammengestellte Geschenksets mit Ihrem Branding — für Kunden, Partner und neue Mitarbeitende.', en: 'Curated gift sets with your branding — for clients, partners and new hires.' },
    highlights: [{ de: 'Kunden, Partner, Onboarding', en: 'Clients, partners, onboarding' }],
    methods: ['laser-engraving', 'dtf'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/gift-set.webp'),
  },
  {
    slug: 'wooden-gifts', hub: 'promotional-products', group: 'corporate-gifts', accent: 30,
    title: { de: 'Holzgeschenke', en: 'Wooden Gifts' },
    tagline: { de: 'Warm, hochwertig, graviert', en: 'Warm, premium, engraved' },
    description: { de: 'Gravierte Geschenke und Boxen aus Holz — hochwertig, nachhaltig und individuell personalisiert.', en: 'Engraved wooden gifts and boxes — premium, sustainable and individually personalised.' },
    highlights: [{ de: 'Boxen, Schilder, Accessoires', en: 'Boxes, signs, accessories' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/wood-emboss.webp'),
  },
  {
    slug: 'awards', hub: 'promotional-products', group: 'corporate-gifts', accent: 85,
    title: { de: 'Pokale & Auszeichnungen', en: 'Awards & Trophies' },
    tagline: { de: 'Mit Gravur, Text oder Logo', en: 'With engraving, text or logo' },
    description: { de: 'Pokale, Medaillen und Auszeichnungen mit individueller Gravur — für Turniere, Vereine und Firmen-Awards.', en: 'Trophies, medals and awards with custom engraving — for tournaments, clubs and corporate awards.' },
    highlights: [{ de: 'Turniere, Vereine, Firmen-Awards', en: 'Tournaments, clubs, corporate awards' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/pokale-medaillen.webp'),
  },
  {
    slug: 'lanyards', hub: 'promotional-products', group: 'conference', accent: 175,
    title: { de: 'Lanyards & Schlüsselbänder', en: 'Lanyards' },
    tagline: { de: 'Bedruckt für Events', en: 'Printed for events' },
    description: { de: 'Bedruckte Schlüsselbänder für Messen, Konferenzen und Firmenausweise — im Sublimationsdruck vollfarbig.', en: 'Printed lanyards for trade shows, conferences and staff passes — full-colour sublimation print.' },
    highlights: [{ de: 'Messen, Konferenzen, Ausweise', en: 'Trade shows, conferences, passes' }],
    methods: ['sublimation'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ,
  },
  {
    slug: 'conference-merchandise', hub: 'promotional-products', group: 'conference', accent: 260,
    title: { de: 'Konferenz-Merchandise', en: 'Conference Merchandise' },
    tagline: { de: 'Komplette Event-Ausstattung', en: 'Complete event kit' },
    description: { de: 'Abgestimmtes Merchandise für Konferenzen und Events — von Taschen über Notizbücher bis zu Giveaways.', en: 'Coordinated merchandise for conferences and events — from bags and notebooks to giveaways.' },
    highlights: [{ de: 'Aufeinander abgestimmte Artikel', en: 'Coordinated item sets' }],
    methods: ['dtf', 'laser-engraving', 'sublimation'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ,
  },
  {
    slug: 'wedding-gifts', hub: 'promotional-products', group: 'wedding', accent: 340,
    title: { de: 'Hochzeitsgeschenke', en: 'Wedding Gifts' },
    tagline: { de: 'Graviert & personalisiert', en: 'Engraved & personalised' },
    description: { de: 'Personalisierte Hochzeitsgeschenke — gravierte Gläser, Schilder und Andenken mit Namen und Datum.', en: 'Personalised wedding gifts — engraved glasses, signs and keepsakes with names and dates.' },
    highlights: [{ de: 'Gläser, Schilder, Andenken', en: 'Glasses, signs, keepsakes' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/champagne-glass-design.webp'),
  },
  {
    slug: 'anniversary-gifts', hub: 'promotional-products', group: 'wedding', accent: 15,
    title: { de: 'Jubiläumsgeschenke', en: 'Anniversary Gifts' },
    tagline: { de: 'Für besondere Momente', en: 'For special moments' },
    description: { de: 'Gravierte Geschenke zu Jubiläen und Jahrestagen — von Schmuck bis zu personalisierten Accessoires.', en: 'Engraved gifts for anniversaries and milestones — from jewellery to personalised accessories.' },
    highlights: [{ de: 'Schmuck & Accessoires', en: 'Jewellery & accessories' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/metal-emboss.webp'),
  },
  {
    slug: 'personalized-gifts', hub: 'promotional-products', group: 'wedding', accent: 290,
    title: { de: 'Personalisierte Geschenke', en: 'Personalized Gifts' },
    tagline: { de: 'Foto- & Namensgravur', en: 'Photo & name engraving' },
    description: { de: 'Individuell gravierte Geschenke mit Foto, Namen oder Wunschmotiv — auf Holz, Glas, Metall und mehr.', en: 'Individually engraved gifts with a photo, name or custom motif — on wood, glass, metal and more.' },
    highlights: [{ de: 'Foto-Gravur auf vielen Materialien', en: 'Photo engraving on many materials' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/wood-emboss-2.webp'),
  },
  {
    slug: 'engraved-gifts', hub: 'promotional-products', group: 'wedding', accent: 60,
    title: { de: 'Gravur-Geschenke', en: 'Engraved Gifts' },
    tagline: { de: 'Holz, Glas, Metall & mehr', en: 'Wood, glass, metal & more' },
    description: { de: 'Präzise Lasergravur auf Holz, Glas und Metall — für Anhänger, Schilder und individuelle Einzelstücke.', en: 'Precise laser engraving on wood, glass and metal — for tags, signs and one-off pieces.' },
    highlights: [{ de: 'Anhänger, Schilder, Einzelstücke', en: 'Tags, signs, one-offs' }],
    methods: ['laser-engraving'], minOrder: 1, deliveryTime: BULK, faq: PROMO_FAQ, cover: c('/img/dog-tags.webp'),
  },
]

export const PRODUCTS: Product[] = [...TEXTILE, ...PROMO]

export function productsForHub(hub: HubSlug): Product[] {
  return PRODUCTS.filter((p) => p.hub === hub)
}
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
export function relatedProducts(p: Product, n = 3): Product[] {
  return PRODUCTS.filter((x) => x.hub === p.hub && x.slug !== p.slug).slice(0, n)
}

// ── Printing methods ──────────────────────────────────────────────────────────
export const METHODS: Method[] = [
  {
    slug: 'dtf', accent: 35,
    name: { de: 'DTF-Druck', en: 'DTF Printing' },
    tagline: { de: 'Kräftige Farben, jedes Motiv', en: 'Vibrant colour, any design' },
    description: { de: 'Direct-to-Film überträgt farbintensive, detailreiche Motive auf nahezu jedes Textil — ideal für Fotos, Verläufe und mehrfarbige Logos.', en: 'Direct-to-film transfers vivid, detailed designs onto almost any fabric — ideal for photos, gradients and multi-colour logos.' },
    bestFor: { de: 'Fotorealistische und mehrfarbige Designs auf Baumwolle und Mischgewebe.', en: 'Photo-real and multi-colour designs on cotton and blends.' },
    image: c('/img/tech-full-color.webp'),
  },
  {
    slug: 'embroidery', accent: 25,
    name: { de: 'Stickerei', en: 'Embroidery' },
    tagline: { de: 'Hochwertig und langlebig', en: 'Premium and long-lasting' },
    description: { de: 'Gestickte Logos wirken besonders edel und sind extrem strapazierfähig — die erste Wahl für Polos, Caps, Jacken und Workwear.', en: 'Stitched logos look especially premium and are extremely durable — the first choice for polos, caps, jackets and workwear.' },
    bestFor: { de: 'Logos auf Polos, Caps, Jacken und Arbeitskleidung.', en: 'Logos on polos, caps, jackets and workwear.' },
    image: c('/img/cap-stiched.webp'),
  },
  {
    slug: 'sublimation', accent: 150,
    name: { de: 'Sublimationsdruck', en: 'Sublimation' },
    tagline: { de: 'Vollflächig, waschfest', en: 'All-over, wash-proof' },
    description: { de: 'Sublimation färbt das Motiv direkt in das Material ein — vollflächig, ohne fühlbaren Druck und dauerhaft farbecht. Ideal für Trikots und Tassen.', en: 'Sublimation dyes the design directly into the material — full-coverage, with no feel on the surface and permanently colour-fast. Ideal for jerseys and mugs.' },
    bestFor: { de: 'Trikots, Sportbekleidung, Tassen und Lanyards.', en: 'Jerseys, sportswear, mugs and lanyards.' },
    image: c('/img/sportswear.webp'),
  },
  {
    slug: 'laser-engraving', accent: 60,
    name: { de: 'Lasergravur', en: 'Laser Engraving' },
    tagline: { de: 'Präzise auf Holz, Glas & Metall', en: 'Precise on wood, glass & metal' },
    description: { de: 'Die Lasergravur trägt Motive dauerhaft und äußerst präzise in Holz, Glas und Metall ein — edel, langlebig und ohne Farbe.', en: 'Laser engraving marks designs permanently and with great precision into wood, glass and metal — elegant, durable and ink-free.' },
    bestFor: { de: 'Geschenke, Pokale, Stifte, Flaschen und Schilder.', en: 'Gifts, awards, pens, bottles and signs.' },
    image: c('/img/lasergravur.webp'),
  },
]
export function getMethod(slug: string): Method | undefined {
  return METHODS.find((m) => m.slug === slug)
}

// ── Gallery (filterable) ──────────────────────────────────────────────────────
export type GalleryItem = { src: string; alt: Localized; tags: string[] }
export const GALLERY_FILTERS: PromoGroup[] = [
  { slug: 'textile', label: { de: 'Textildruck', en: 'Textile Printing' } },
  { slug: 'corporate-gifts', label: { de: 'Firmengeschenke', en: 'Corporate Gifts' } },
  { slug: 'promotional', label: { de: 'Werbeartikel', en: 'Promotional Products' } },
  { slug: 'workwear', label: { de: 'Arbeitskleidung', en: 'Workwear' } },
  { slug: 'events', label: { de: 'Events', en: 'Events' } },
  { slug: 'wedding', label: { de: 'Hochzeit', en: 'Wedding Gifts' } },
]
export const GALLERY: GalleryItem[] = [
  { src: c('/img/tshirt-printing.webp'), alt: { de: 'Trikot-Druck', en: 'Jersey printing' }, tags: ['textile', 'events'] },
  { src: c('/img/tshirt-wall.webp'), alt: { de: 'Bedruckte Shirts', en: 'Printed shirts' }, tags: ['textile'] },
  { src: c('/img/shop-wall-tshirts.webp'), alt: { de: 'Shirt-Wand im Studio', en: 'Shirt wall in the studio' }, tags: ['textile', 'events'] },
  { src: c('/img/cap-stiched.webp'), alt: { de: 'Bestickte Cap', en: 'Embroidered cap' }, tags: ['textile', 'promotional'] },
  { src: c('/img/lumina-bag.webp'), alt: { de: 'Bedruckter Stoffbeutel', en: 'Printed tote bag' }, tags: ['textile', 'promotional'] },
  { src: c('/img/gift-set.webp'), alt: { de: 'Firmengeschenk-Set', en: 'Corporate gift set' }, tags: ['corporate-gifts', 'promotional'] },
  { src: c('/img/embossed-pen.webp'), alt: { de: 'Gravierter Stift', en: 'Engraved pen' }, tags: ['corporate-gifts', 'promotional'] },
  { src: c('/img/wood-emboss.webp'), alt: { de: 'Gravierte Holzbox', en: 'Engraved wooden box' }, tags: ['corporate-gifts', 'wedding'] },
  { src: c('/img/dog-tags.webp'), alt: { de: 'Gravierte Anhänger', en: 'Engraved tags' }, tags: ['promotional', 'corporate-gifts'] },
  { src: c('/img/champagne-glass-design.webp'), alt: { de: 'Gravierte Sektgläser', en: 'Engraved champagne glasses' }, tags: ['wedding'] },
  { src: c('/img/metal-emboss.webp'), alt: { de: 'Gravierter Armreif', en: 'Engraved bracelet' }, tags: ['wedding'] },
  { src: c('/img/wood-emboss-2.webp'), alt: { de: 'Foto-Gravur auf Holz', en: 'Photo engraving on wood' }, tags: ['wedding'] },
  { src: c('/img/shop-showcase.webp'), alt: { de: 'Studio-Auslage', en: 'Studio showcase' }, tags: ['events'] },
  { src: c('/img/shop-showcase-2.webp'), alt: { de: 'Schaufenster-Auslage', en: 'Window display' }, tags: ['events', 'textile'] },
]
