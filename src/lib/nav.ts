// Single source of navigation structure. `to` values must match real routes.
import type { Key } from './i18n'

export type NavItem = { to: string; key: Key }

/** Apparel product categories. */
export const PRODUCT_NAV: NavItem[] = [
  { to: '/t-shirts', key: 'nav.tshirts' },
  { to: '/hoodies', key: 'nav.hoodies' },
  { to: '/workwear', key: 'nav.workwear' },
  { to: '/sportswear', key: 'nav.sportswear' },
  { to: '/accessories', key: 'nav.accessories' },
]

/** Specialty production lines. */
export const SPECIALTY_NAV: NavItem[] = [
  { to: '/lasergravur', key: 'nav.engraving' },
  { to: '/werbetechnik', key: 'nav.signage' },
  { to: '/aufkleber', key: 'nav.stickers' },
  { to: '/3d-druck', key: 'nav.print3d' },
  { to: '/geschenke', key: 'nav.gifts' },
  { to: '/trikot-restauration', key: 'nav.restoration' },
  { to: '/pokale-medaillen', key: 'nav.trophies' },
  { to: '/werbeartikel', key: 'nav.promo' },
]

/** Company / info routes. */
export const COMPANY_NAV: NavItem[] = [
  { to: '/business', key: 'nav.business' },
  { to: '/leistungen', key: 'nav.services' },
  { to: '/print-techniques', key: 'nav.techniques' },
  { to: '/express', key: 'nav.express' },
  { to: '/portfolio', key: 'nav.portfolio' },
  { to: '/about', key: 'nav.about' },
  { to: '/faq', key: 'nav.faq' },
  { to: '/contact', key: 'nav.contact' },
]

/** Desktop header links (curated). */
export const HEADER_NAV: NavItem[] = [
  { to: '/business', key: 'nav.business' },
  { to: '/leistungen', key: 'nav.services' },
  { to: '/t-shirts', key: 'nav.tshirts' },
  { to: '/lasergravur', key: 'nav.engraving' },
  { to: '/werbetechnik', key: 'nav.signage' },
  { to: '/express', key: 'nav.express' },
  { to: '/portfolio', key: 'nav.portfolio' },
]

/** Bottom tab bar (mobile) — 4 tabs. */
export const TAB_NAV: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/leistungen', key: 'nav.services' },
  { to: '/portfolio', key: 'nav.portfolio' },
  { to: '/contact', key: 'nav.contact' },
]
