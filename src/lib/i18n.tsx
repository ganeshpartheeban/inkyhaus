// Context-based i18n. Strings live here as Record<Locale, Record<Key, string>>.
//
// de = primary (fully populated), en = fully populated. fr/es/it are scaffolded:
// adding a language is purely a strings file — drop a partial/full dict below and
// it falls back through en -> de for any missing key.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const LOCALES = ['de', 'en', 'fr', 'es', 'it'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'de'

/** Locales exposed in the UI toggle. Flip the flag in __root to launch DE-only. */
export const ACTIVE_LOCALES: Locale[] = ['de', 'en']

export const LOCALE_LABELS: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
}

/** og:locale values for hreflang / OG tags. */
export const OG_LOCALE: Record<Locale, string> = {
  de: 'de_DE',
  en: 'en_GB',
  fr: 'fr_FR',
  es: 'es_ES',
  it: 'it_IT',
}

const STORAGE_KEY = 'inkyhaus-locale'

const de = {
  'nav.home': 'Start',
  'nav.business': 'Firmenkunden',
  'nav.workwear': 'Arbeitskleidung',
  'nav.tshirts': 'T-Shirts',
  'nav.hoodies': 'Hoodies',
  'nav.sportswear': 'Teamwear',
  'nav.accessories': 'Accessoires',
  'nav.techniques': 'Drucktechniken',
  'nav.express': 'Express',
  'nav.portfolio': 'Referenzen',
  'nav.about': 'Über uns',
  'nav.faq': 'FAQ',
  'nav.contact': 'Kontakt',
  'nav.services': 'Leistungen',
  'nav.engraving': 'Lasergravur',
  'nav.print3d': '3D-Druck',
  'nav.signage': 'Werbetechnik',
  'nav.stickers': 'Aufkleber',
  'nav.gifts': 'Geschenke',
  'nav.restoration': 'Trikot-Restauration',
  'nav.trophies': 'Pokale & Medaillen',

  'cta.enquire': 'Angebot anfragen',
  'cta.quote': 'Angebot anfragen',
  'cta.whatsapp': 'Per WhatsApp anfragen',
  'cta.startDesign': 'Jetzt gestalten',
  'cta.viewAll': 'Alle ansehen',
  'nav.textile': 'Textildruck',
  'nav.promo': 'Werbeartikel',
  'nav.methods': 'Druckverfahren',
  'nav.gallery': 'Galerie',
  'cta.requestQuote': 'Angebot anfragen',
  'cta.browseProducts': 'Produkte ansehen',
  'product.colours': 'Verfügbare Farben',
  'product.coloursNote': 'Weitere Farben auf Anfrage.',
  'product.sizes': 'Größen',
  'product.sizesNote': 'Größentabelle auf Anfrage — von XS bis 3XL.',
  'product.methods': 'Druckverfahren',
  'product.faq': 'Häufige Fragen',
  'product.related': 'Passt dazu',
  'product.quoteSub': 'Produkt, Menge und Termin — wir melden uns meist am selben Tag.',
  'method.bestFor': 'Am besten geeignet für',
  'method.products': 'Produkte mit diesem Verfahren',
  'cta.learnMore': 'Mehr erfahren',
  'cta.allProducts': 'Alle Produkte',

  'home.hero.eyebrow': 'Textildruck & Veredelung · Berlin Friedrichshain',
  'home.hero.title': 'Individuelle Textilien, die Ihre Marke repräsentieren',
  'home.hero.subtitle': 'Vom einzelnen personalisierten T-Shirt bis zum großen Firmenauftrag — Inkyhaus produziert hochwertige Bekleidung mit Logo, lokal in Berlin gefertigt.',
  'home.hero.ctaPrimary': 'Angebot anfragen',
  'home.hero.ctaSecondary': 'Drucktechniken ansehen',

  'home.trust.noMinimum': 'Keine Mindestbestellmenge',
  'home.trust.local': 'Lokale Produktion in Berlin',
  'home.trust.express': '24–72h Produktion · Express möglich',
  'home.trust.quality': 'Premium-Qualität & persönliche Beratung',

  'home.categories.title': 'Was wir bedrucken',
  'home.categories.subtitle': 'Eigene Designs auf hochwertigen Textilien — für Unternehmen und Privatkunden.',

  'home.business.eyebrow': 'Für Unternehmen',
  'home.business.title': 'Firmenbekleidung & Merchandise mit System',
  'home.business.body': 'Corporate Uniformen, Onboarding-Kits, Eventbekleidung und Nachbestell-Programme — mit Mengenrabatten und einem festen Ansprechpartner.',
  'home.business.cta': 'Firmenlösungen entdecken',

  'home.techniques.eyebrow': 'Drucktechniken',
  'home.techniques.title': 'Sechs Veredelungen für jeden Anlass',
  'home.techniques.subtitle': 'Von kräftigem Vollfarbdruck bis zu Spezialeffekten.',

  'home.portfolio.eyebrow': 'Referenzen',
  'home.portfolio.title': 'Ausgewählte Projekte',
  'home.portfolio.subtitle': 'Echte Aufträge aus Gastronomie, Sport, Events und Startups.',

  'home.express.eyebrow': 'Express Textildruck',
  'home.express.title': 'Kurzfristig? Kein Problem.',
  'home.express.body': 'Eilige Bestellungen oft am selben Tag möglich, Abholung in Berlin verfügbar.',
  'home.express.cta': 'Express anfragen',

  'home.testimonials.title': 'Was Kundinnen und Kunden sagen',
  'home.faq.title': 'Häufige Fragen',
  'home.finalCta.title': 'Erstellen Sie individuelle Bekleidung, die auffällt',
  'home.finalCta.body': 'Design hochladen, Text hinzufügen, Produkt wählen — und Ihre Idee mit Inkyhaus umsetzen.',

  'home.quick.label': 'Schnellauswahl',
  'home.services.eyebrow': 'Mehr als Textil',
  'home.services.title': 'Veredelung, Gravur, 3D & Werbetechnik',
  'home.services.subtitle': 'Ein Studio für individuelle Produktionen aller Art — lokal in Berlin.',
  'home.process.eyebrow': 'So funktionieren Aufträge',
  'home.process.title': 'In vier Schritten zum fertigen Produkt',
  'home.occasions.eyebrow': 'Für jeden Anlass',
  'home.occasions.title': 'Wofür wir produzieren',
  'home.occasions.subtitle': 'Von der JGA-Crew bis zur Firmenfeier.',
  'home.social.title': 'Von Kundinnen und Kunden empfohlen',
  'home.social.basedOn': 'basierend auf Kundenfeedback',
  'home.social.reviews': 'Google-Bewertungen',
  'leistungen.title': 'Alle Leistungen',
  'leistungen.subtitle': 'Vom Textildruck über Gravur und 3D-Druck bis zur Werbetechnik.',
  'leistungen.apparel': 'Textil & Bekleidung',
  'leistungen.specialty': 'Veredelung & Spezialproduktionen',

  'channels.badge': 'Online & vor Ort bestellen',
  'channels.eyebrow': 'Online & vor Ort',
  'channels.title': 'Zwei Wege zu Ihrer Bestellung',
  'channels.online.title': 'Online anfragen',
  'channels.online.body': 'Design und Eckdaten senden — wir antworten mit Angebot und Produktionszeit. Lieferung in ganz Berlin, ab 49 € kostenlos.',
  'channels.offline.title': 'Vor Ort in Berlin',
  'channels.offline.body': 'Beratung, Abholung und Express im Studio in Friedrichshain — persönlich und schnell.',
  'contact.visit': 'Studio & Abholung',
  'contact.directions': 'Route planen',
  'contact.goodToKnow': 'Gut zu wissen',

  'form.title': 'Angebot anfragen',
  'form.name': 'Name',
  'form.email': 'E-Mail',
  'form.phone': 'Telefon (optional)',
  'form.eventType': 'Worum geht es?',
  'form.quantity': 'Menge',
  'form.date': 'Wunschtermin (optional)',
  'form.message': 'Ihre Nachricht',
  'form.file': 'Datei / Artwork (optional)',
  'form.fileHint': 'Logo oder Design anhängen — PDF, SVG, AI/EPS oder hochauflösendes PNG/JPG.',
  'form.submit': 'Anfrage senden',
  'form.sending': 'Wird gesendet …',
  'form.success': 'Danke! Wir melden uns schnellstmöglich.',
  'form.error': 'Etwas ist schiefgelaufen. Bitte per WhatsApp versuchen.',
  'form.limit': 'Sie haben bereits angefragt — wir sind dran. Bitte per WhatsApp nachfassen.',
  'form.required': 'Pflichtfeld',

  'footer.tagline': 'Premium Textildruck & Veredelung in Berlin.',
  'footer.call': 'Anrufen',
  'footer.products': 'Produkte',
  'footer.company': 'Unternehmen',
  'footer.legal': 'Rechtliches',
  'footer.imprint': 'Impressum',
  'footer.privacy': 'Datenschutz',
  'footer.terms': 'AGB',
  'footer.rights': 'Alle Rechte vorbehalten.',

  'cookie.text': 'Möchten Sie direkt mit uns chatten? Dafür laden wir einen Live-Chat (tawk.to, ein US-Dienst). Kein Muss – Sie erreichen uns jederzeit auch per WhatsApp oder E-Mail. Unsere Statistik ist anonym und cookiefrei.',
  'cookie.accept': 'Chat aktivieren',
  'cookie.decline': 'Nicht jetzt',
  'a11y.menu': 'Menü',
  'a11y.close': 'Schließen',
  'a11y.langToggle': 'Sprache wechseln',
} as const

export type Key = keyof typeof de

const en: Record<Key, string> = {
  'nav.home': 'Home',
  'nav.business': 'For Business',
  'nav.workwear': 'Workwear',
  'nav.tshirts': 'T-Shirts',
  'nav.hoodies': 'Hoodies',
  'nav.sportswear': 'Teamwear',
  'nav.accessories': 'Accessories',
  'nav.techniques': 'Print Techniques',
  'nav.express': 'Express',
  'nav.portfolio': 'Portfolio',
  'nav.about': 'About',
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',
  'nav.services': 'Services',
  'nav.engraving': 'Laser Engraving',
  'nav.print3d': '3D Printing',
  'nav.signage': 'Signage',
  'nav.stickers': 'Stickers',
  'nav.gifts': 'Gifts',
  'nav.restoration': 'Jersey Restoration',
  'nav.trophies': 'Trophies & Medals',

  'cta.enquire': 'Request a Quote',
  'cta.quote': 'Request a Quote',
  'cta.whatsapp': 'Enquire via WhatsApp',
  'cta.startDesign': 'Start Designing',
  'cta.viewAll': 'View all',
  'nav.textile': 'Textile Printing',
  'nav.promo': 'Promotional Products',
  'nav.methods': 'Printing Methods',
  'nav.gallery': 'Gallery',
  'cta.requestQuote': 'Request a Quote',
  'cta.browseProducts': 'Browse Products',
  'product.colours': 'Available colours',
  'product.coloursNote': 'More colours on request.',
  'product.sizes': 'Sizes',
  'product.sizesNote': 'Size guide on request — from XS to 3XL.',
  'product.methods': 'Printing methods',
  'product.faq': 'FAQ',
  'product.related': 'Related products',
  'product.quoteSub': 'Product, quantity and deadline — we usually reply the same day.',
  'method.bestFor': 'Best for',
  'method.products': 'Products using this method',
  'cta.learnMore': 'Learn more',
  'cta.allProducts': 'All products',

  'home.hero.eyebrow': 'Textile Printing & Finishing · Berlin Friedrichshain',
  'home.hero.title': 'Custom Apparel That Represents Your Brand',
  'home.hero.subtitle': 'From a single personalized T-shirt to large-scale corporate apparel programs — Inkyhaus creates premium custom clothing, produced locally in Berlin.',
  'home.hero.ctaPrimary': 'Request a Quote',
  'home.hero.ctaSecondary': 'See print techniques',

  'home.trust.noMinimum': 'No minimum order quantity',
  'home.trust.local': 'Local production in Berlin',
  'home.trust.express': '24–72h production · Express available',
  'home.trust.quality': 'Premium quality & personal support',

  'home.categories.title': 'What we print',
  'home.categories.subtitle': 'Your designs on premium garments — for businesses and individuals.',

  'home.business.eyebrow': 'For Business',
  'home.business.title': 'Corporate apparel & merchandise, systemised',
  'home.business.body': 'Corporate uniforms, onboarding kits, event apparel and repeat-order programs — with volume discounts and a dedicated contact.',
  'home.business.cta': 'Explore business solutions',

  'home.techniques.eyebrow': 'Print Techniques',
  'home.techniques.title': 'Six finishes for every occasion',
  'home.techniques.subtitle': 'From bold full-color print to special effects.',

  'home.portfolio.eyebrow': 'Portfolio',
  'home.portfolio.title': 'Selected projects',
  'home.portfolio.subtitle': 'Real work for hospitality, sport, events and startups.',

  'home.express.eyebrow': 'Express Printing',
  'home.express.title': 'Short notice? No problem.',
  'home.express.body': 'Urgent orders often possible same day, with pickup available in Berlin.',
  'home.express.cta': 'Request express',

  'home.testimonials.title': 'What customers say',
  'home.faq.title': 'Frequently asked questions',
  'home.finalCta.title': 'Create custom apparel that stands out',
  'home.finalCta.body': 'Upload your design, add your text, choose your product — and bring your idea to life with Inkyhaus.',

  'home.quick.label': 'Quick pick',
  'home.services.eyebrow': 'Beyond textiles',
  'home.services.title': 'Finishing, engraving, 3D & signage',
  'home.services.subtitle': 'One studio for custom production of every kind — local in Berlin.',
  'home.process.eyebrow': 'How orders work',
  'home.process.title': 'Four steps to your finished product',
  'home.occasions.eyebrow': 'For every occasion',
  'home.occasions.title': 'What we produce for',
  'home.occasions.subtitle': 'From the stag-party crew to the company celebration.',
  'home.social.title': 'Recommended by our customers',
  'home.social.basedOn': 'based on customer feedback',
  'home.social.reviews': 'Google reviews',
  'leistungen.title': 'All services',
  'leistungen.subtitle': 'From textile printing to engraving, 3D printing and signage.',
  'leistungen.apparel': 'Apparel & textiles',
  'leistungen.specialty': 'Finishing & specialty production',

  'channels.badge': 'Order online & in-store',
  'channels.eyebrow': 'Online & in person',
  'channels.title': 'Two ways to order',
  'channels.online.title': 'Order online',
  'channels.online.body': 'Send your design and details — we reply with a quote and production time. Delivery across Berlin, free from €49.',
  'channels.offline.title': 'In person in Berlin',
  'channels.offline.body': 'Advice, pickup and express at our Friedrichshain studio — personal and fast.',
  'contact.visit': 'Studio & pickup',
  'contact.directions': 'Get directions',
  'contact.goodToKnow': 'Good to know',

  'form.title': 'Request a Quote',
  'form.name': 'Name',
  'form.email': 'Email',
  'form.phone': 'Phone (optional)',
  'form.eventType': 'What is it for?',
  'form.quantity': 'Quantity',
  'form.date': 'Preferred date (optional)',
  'form.message': 'Your message',
  'form.file': 'File / artwork (optional)',
  'form.fileHint': 'Attach your logo or design — PDF, SVG, AI/EPS or a high-resolution PNG/JPG.',
  'form.submit': 'Send enquiry',
  'form.sending': 'Sending …',
  'form.success': 'Thank you! We will get back to you as soon as possible.',
  'form.error': 'Something went wrong. Please try via WhatsApp.',
  'form.limit': "You've already enquired — we're on it. Please follow up via WhatsApp.",
  'form.required': 'Required',

  'footer.tagline': 'Premium textile printing & finishing in Berlin.',
  'footer.call': 'Call',
  'footer.products': 'Products',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.imprint': 'Imprint',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.rights': 'All rights reserved.',

  'cookie.text': 'Fancy a live chat with us? We’ll load our chat widget (tawk.to, a US service). No pressure — you can always reach us via WhatsApp or email too. Our analytics stay anonymous and cookie-free.',
  'cookie.accept': 'Enable chat',
  'cookie.decline': 'Not now',
  'a11y.menu': 'Menu',
  'a11y.close': 'Close',
  'a11y.langToggle': 'Switch language',
}

// Scaffolded locales — populate to enable. Missing keys fall back en -> de.
const fr: Partial<Record<Key, string>> = {}
const es: Partial<Record<Key, string>> = {}
const it: Partial<Record<Key, string>> = {}

const DICTS: Record<Locale, Partial<Record<Key, string>>> = { de, en, fr, es, it }

function detectLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && LOCALES.includes(stored)) return stored
    const nav = (navigator.language || '').slice(0, 2).toLowerCase() as Locale
    if (ACTIVE_LOCALES.includes(nav)) return nav
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_LOCALE
}

type I18nContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: Key) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // SSR renders the default locale; client re-detects after mount (no hydration flash for de).
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const detected = detectLocale()
    if (detected !== locale) setLocaleState(detected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: Key) => DICTS[locale][key] ?? en[key] ?? de[key] ?? key,
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
