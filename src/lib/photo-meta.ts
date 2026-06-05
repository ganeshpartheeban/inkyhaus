// Per-image metadata, keyed by 1-based image number (Build Brief §08).
// Repurposed for apparel/portfolio imagery: drives alt text, gallery + lightbox
// captions, and ImageGallery JSON-LD. EXIF dateCreated is dropped (not relevant
// to studio product shots); caption + venue/location are kept.
//
// ⚠️ PLACEHOLDER until real photography lands. Add entries as images are added to
// /public/gallery-thumbs and /public/gallery-full.
import type { Locale } from './i18n'

export type PhotoMeta = {
  title: { de: string; en: string }
  detail?: { de: string; en: string }
  location?: string
}

export const PHOTO_META: Record<number, PhotoMeta> = {
  // 1: { title: { de: 'Crew-Shirt Detail', en: 'Crew shirt detail' }, location: 'Berlin' },
}

export function altFor(n: number, locale: Locale): string {
  const m = PHOTO_META[n]
  if (!m) return `Inkyhaus — Berlin Textildruck (${n})`
  const base = m.title[locale === 'en' ? 'en' : 'de']
  return m.detail ? `${base} — ${m.detail[locale === 'en' ? 'en' : 'de']}` : base
}
