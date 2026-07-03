// Trust points, FAQs, and testimonials.
//
// Real customer reviews from the Inkyhaus Google Business Profile.
import type { Localized } from './catalog'

export const TESTIMONIALS_ARE_PLACEHOLDER = false

// ── Real "why companies work with Inkyhaus" (from inkyhaus.de) ──────────────
export const WHY_US: Localized[] = [
  { de: 'Premium-Qualität', en: 'Premium Quality' },
  { de: 'Schnelle Produktion', en: 'Fast Turnaround' },
  { de: 'Keine Mindestmenge bei vielen Produkten', en: 'No Minimum Order on Many Products' },
  { de: 'Business- & Firmenlösungen', en: 'Business & Corporate Solutions' },
  { de: 'Made in Berlin', en: 'Made in Berlin' },
  { de: 'Design-Unterstützung', en: 'Design Support' },
]

// 6-step "How it works" flow (revamped IA).
export const HOW_STEPS: Localized[] = [
  { de: 'Produkt wählen', en: 'Choose a Product' },
  { de: 'Menge angeben', en: 'Select Quantity' },
  { de: 'Design hochladen', en: 'Upload Your Design' },
  { de: 'Angebot erhalten', en: 'Receive Your Quote' },
  { de: 'Produktion', en: 'Production' },
  { de: 'Abholung oder Lieferung', en: 'Pickup or Delivery' },
]

// ── Rating from the Google Business Profile.
// Reviews supplied are uniformly 5★. ⚠️ Confirm the exact live average + total on
// Google and adjust these two numbers if they differ.
export const RATING_IS_REAL = true
export const RATING = { value: 5.0, count: 29 }

export const TRUST_POINTS: Localized[] = [
  { de: 'Bestellung ab einem Stück', en: 'Order from just one piece' },
  { de: 'Schnelle lokale Produktion in Berlin', en: 'Fast local production in Berlin' },
  { de: 'Hochwertige Textilien', en: 'Premium-quality garments' },
  { de: 'Business- und Privatkunden', en: 'Business and private orders' },
  { de: 'Express-Service verfügbar', en: 'Express service available' },
  { de: 'Persönliche Beratung', en: 'Personal support' },
  { de: 'Mehrere Drucktechniken', en: 'Multiple print techniques' },
  { de: 'Kleine und große Mengen', en: 'Large and small quantities welcome' },
]

export type Faq = { q: Localized; a: Localized }

export const FAQS: Faq[] = [
  {
    q: { de: 'Gibt es eine Mindestbestellmenge?', en: 'Is there a minimum order quantity?' },
    a: {
      de: 'Nein. Bei Inkyhaus bestellen Sie ab einem einzigen Stück — vom Einzelstück bis zum Großauftrag.',
      en: 'No. At Inkyhaus you can order from a single piece — from one-offs to large orders.',
    },
  },
  {
    q: { de: 'Wie schnell ist die Produktion?', en: 'How fast is production?' },
    a: {
      de: 'Die meisten Bestellungen werden innerhalb von 24–72 Stunden fertiggestellt. Kleine Mengen sind oft am selben Tag möglich.',
      en: 'Most orders are completed within 24–72 hours. Small quantities are often possible the same day.',
    },
  },
  {
    q: { de: 'Welche Druckverfahren bietet ihr an?', en: 'Which print techniques do you offer?' },
    a: {
      de: 'Vollfarbdruck, Puff-Druck, Glitzerdruck, Reflexdruck, Metallic-Druck und Neon-Druck — passend zu Material und Design.',
      en: 'Full-color, puff, glitter, reflective, metallic and neon printing — matched to your material and design.',
    },
  },
  {
    q: { de: 'In welchem Format soll ich mein Artwork liefern?', en: 'What format should I supply my artwork in?' },
    a: {
      de: 'Am besten als Vektordatei (PDF, SVG, AI/EPS). Hochauflösende PNG/JPG funktionieren ebenfalls. Unsicher? Wir prüfen Ihre Datei vor dem Druck.',
      en: 'Vector files are best (PDF, SVG, AI/EPS). High-resolution PNG/JPG also work. Not sure? We check your file before printing.',
    },
  },
  {
    q: { de: 'Liefert ihr in Berlin?', en: 'Do you deliver in Berlin?' },
    a: {
      de: `Ja — kostenlose Lieferung in Berlin ab ${49} €. Abholung in Friedrichshain ist ebenfalls möglich.`,
      en: 'Yes — free delivery in Berlin from €49. Pickup in Friedrichshain is also available.',
    },
  },
  {
    q: { de: 'Wie langlebig ist der Druck?', en: 'How durable is the print?' },
    a: {
      de: 'Bei sachgemäßer Pflege bleiben unsere Drucke über viele Wäschen farbecht und rissfrei. Pflegehinweise erhalten Sie mit jeder Bestellung.',
      en: 'With proper care our prints stay colorfast and crack-free across many washes. Care instructions come with every order.',
    },
  },
]

// ── Store info (Google Business Profile attributes) ─────────────────────────
export type InfoGroup = { id: string; title: Localized; items: Localized[] }
export const STORE_INFO: InfoGroup[] = [
  {
    id: 'service',
    title: { de: 'Serviceoptionen', en: 'Service options' },
    items: [
      { de: 'Lieferung', en: 'Delivery' },
      { de: 'Abholung im Geschäft', en: 'In-store pick-up' },
      { de: 'Einkauf vor Ort', en: 'In-store shopping' },
      { de: 'Vor-Ort-Service', en: 'On-site services' },
    ],
  },
  {
    id: 'payments',
    title: { de: 'Zahlung', en: 'Payments' },
    items: [{ de: 'NFC-/Mobile-Zahlung', en: 'NFC mobile payments' }],
  },
  {
    id: 'amenities',
    title: { de: 'Ausstattung', en: 'Amenities' },
    items: [
      { de: 'WLAN', en: 'Wi-Fi' },
      { de: 'Toilette', en: 'Restroom' },
      { de: 'Geschlechtsneutrale Toiletten', en: 'Gender-neutral toilets' },
    ],
  },
  {
    id: 'accessibility',
    title: { de: 'Barrierefreiheit', en: 'Accessibility' },
    items: [{ de: 'Assistive Höranlage', en: 'Assisted listening devices' }],
  },
  {
    id: 'community',
    title: { de: 'Community', en: 'Crowd' },
    items: [
      { de: 'LGBTQ+-freundlich', en: 'LGBTQ+ friendly' },
      { de: 'Safe Space für Transgender', en: 'Transgender safe space' },
    ],
  },
]

export type Testimonial = {
  quote: Localized
  author: string
  role: Localized
}

// Real Google reviews (quote text kept as written; shown in both locales).
const r = (s: string): Localized => ({ de: s, en: s })
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: r('I asked for logos on two high-vis jackets. The staff was very friendly and supportive — done in two days in great quality.'),
    author: 'Dennis Nguyen',
    role: { de: 'Arbeitskleidung mit Logo', en: 'Workwear with logo' },
  },
  {
    quote: r('They got my t-shirt done within an hour and even helped with the design. Couldn’t be happier. Thanks guys!'),
    author: 'Chr',
    role: { de: 'Express · T-Shirt', en: 'Express · T-shirt' },
  },
  {
    quote: r('I had a gold-printed T-shirt made and I’m absolutely thrilled. The gold foil looks incredibly high-quality, with a sophisticated sheen.'),
    author: 'Naga Raju Madavi',
    role: { de: 'Metallic-Druck', en: 'Metallic print' },
  },
  {
    quote: r('We were tourists in Berlin and stumbled upon Inkyhaus by chance. We had glitter T-shirts printed — brilliant colors and a top-notch glitter print.'),
    author: 'Sahastra Sugali',
    role: { de: 'Glitzerdruck', en: 'Glitter print' },
  },
  {
    quote: r('High-quality laser engraving on wood in Berlin. Precisely crafted, excellent quality, friendly service and a fast turnaround.'),
    author: 'Estere Vankdotha',
    role: { de: 'Lasergravur', en: 'Laser engraving' },
  },
  {
    quote: r('Our family had personalized mugs and photo gifts made with sublimation printing. Everything was beautifully done — the children were thrilled!'),
    author: 'Sugali Sahastra',
    role: { de: 'Personalisierte Geschenke', en: 'Personalized gifts' },
  },
  {
    quote: r('Best place for all kinds of printed accessories and T-shirts in Berlin — and they also provide online services.'),
    author: 'Ajithkumar Aiyanar',
    role: { de: 'Online & vor Ort', en: 'Online & in-store' },
  },
  {
    quote: r('Excellent textile printing. Fast, flexible, and with great taste. Would gladly use again!'),
    author: 'Lukas Keuchel',
    role: { de: 'Textildruck', en: 'Textile printing' },
  },
]
