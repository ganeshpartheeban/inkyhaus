// Central, single-source site configuration.
//
// ⚠️ PLACEHOLDER VALUES are marked `TODO`. They were not present in the brief PDFs
// or recoverable from the live site and must be confirmed before launch.

export const SITE = {
  name: 'Inkyhaus',
  /** Canonical site URL — overridden by VITE_SITE_URL at build time. No trailing slash. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://inkyhaus.de',

  // ── Contact (confirmed from live site / TODO) ──────────────────────────────
  city: 'Berlin',
  district: 'Friedrichshain',
  country: 'DE',
  /** From the live site WhatsApp link: +49 176 63648012 */
  whatsappNumber: '4917663648012',
  /** Public business email (Titan mailbox). */
  email: 'contact@inkyhaus.de',
  /** Secondary public email (Gmail). */
  emailAlt: 'inkyhaus.de@gmail.com',
  /** Public phone — same line as WhatsApp, so customers can call or chat it. */
  phone: '+49 176 63648012',
  /** Additional public phone line (call only). */
  phone2: '+49 176 30502944',
  /** Confirmed studio address. */
  street: 'Palisadenstraße 42',
  postalCode: '10243',
  /** Studio coordinates (Google Maps listing). */
  geo: { lat: 52.518601, lng: 13.4385888 },
  /** Google Maps listing for directions / "find us" (official short link). */
  mapsUrl: 'https://maps.app.goo.gl/JsEQSYvBdXqbQRJv8',

  // ── Ordering channels: BOTH online and in-store/offline. ───────────────────
  ordersOnline: true,
  ordersOffline: true, // pickup / on-site at the Berlin Friedrichshain studio

  // ── Commercial facts (confirmed from live site) ────────────────────────────
  minOrder: 1, // "Es gibt keine Mindestbestellmenge"
  productionHours: '24–72h',
  freeDeliveryFrom: 49, // € free delivery in Berlin
  expressAvailable: true,

  // ── Social (TODO: confirm handles) ─────────────────────────────────────────
  social: {
    instagram: '', // TODO
    facebook: '', // TODO
  },

  // ── Owner (confirmed — see /imprint) ────────────────────────────────────────
  founder: {
    name: 'Vankdoth Srinivas Naik',
    jobTitle: 'Inhaber (Einzelunternehmer)',
  },
} as const

/** Build a source-aware WhatsApp deep link with a route-contextual prefilled message. */
export function whatsappLink(message: string): string {
  const base = `https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}`
  return `${base}&text=${encodeURIComponent(message)}`
}
