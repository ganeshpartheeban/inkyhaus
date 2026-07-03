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
  'nav.about': 'Über uns',
  'nav.faq': 'FAQ',
  'nav.contact': 'Kontakt',

  'cta.enquire': 'Angebot anfragen',
  'cta.quote': 'Angebot anfragen',
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


  'home.trust.noMinimum': 'Keine Mindestbestellmenge',
  'home.trust.local': 'Lokale Produktion in Berlin',
  'home.trust.express': '24–72h Produktion · Express möglich',
  'home.trust.quality': 'Premium-Qualität & persönliche Beratung',


  'home.business.eyebrow': 'Für Unternehmen',
  'home.business.title': 'Firmenbekleidung & Merchandise mit System',
  'home.business.body': 'Corporate Uniformen, Onboarding-Kits, Eventbekleidung und Nachbestell-Programme — mit Mengenrabatten und einem festen Ansprechpartner.',
  'home.business.cta': 'Firmenlösungen entdecken',




  'home.faq.title': 'Häufige Fragen',
  'home.finalCta.title': 'Erstellen Sie individuelle Bekleidung, die auffällt',
  'home.finalCta.body': 'Design hochladen, Text hinzufügen, Produkt wählen — und Ihre Idee mit Inkyhaus umsetzen.',

  'home.social.title': 'Von Kundinnen und Kunden empfohlen',
  'home.social.reviews': 'Google-Bewertungen',

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

  'footer.tagline': 'Premium Textildruck & Veredelung in Berlin.',
  'footer.call': 'Anrufen',
  'footer.company': 'Unternehmen',
  'footer.legal': 'Rechtliches',
  'footer.imprint': 'Impressum',
  'footer.privacy': 'Datenschutz',
  'footer.terms': 'AGB',
  'footer.rights': 'Alle Rechte vorbehalten.',
  'footer.consent': 'Cookie- & Chat-Einstellungen',

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
  'nav.about': 'About',
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',

  'cta.enquire': 'Request a Quote',
  'cta.quote': 'Request a Quote',
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


  'home.trust.noMinimum': 'No minimum order quantity',
  'home.trust.local': 'Local production in Berlin',
  'home.trust.express': '24–72h production · Express available',
  'home.trust.quality': 'Premium quality & personal support',


  'home.business.eyebrow': 'For Business',
  'home.business.title': 'Corporate apparel & merchandise, systemised',
  'home.business.body': 'Corporate uniforms, onboarding kits, event apparel and repeat-order programs — with volume discounts and a dedicated contact.',
  'home.business.cta': 'Explore business solutions',




  'home.faq.title': 'Frequently asked questions',
  'home.finalCta.title': 'Create custom apparel that stands out',
  'home.finalCta.body': 'Upload your design, add your text, choose your product — and bring your idea to life with Inkyhaus.',

  'home.social.title': 'Recommended by our customers',
  'home.social.reviews': 'Google reviews',

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

  'footer.tagline': 'Premium textile printing & finishing in Berlin.',
  'footer.call': 'Call',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.imprint': 'Imprint',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.rights': 'All rights reserved.',
  'footer.consent': 'Cookie & chat settings',

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
