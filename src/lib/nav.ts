// Single source of navigation structure. `to` values must match real routes.
import type { Key } from './i18n'

export type NavItem = { to: string; key: Key }

/** Desktop header links. */
export const HEADER_NAV: NavItem[] = [
  { to: '/textile-printing', key: 'nav.textile' },
  { to: '/promotional-products', key: 'nav.promo' },
  { to: '/printing-methods', key: 'nav.methods' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

/** Bottom tab bar (mobile). */
export const TAB_NAV: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/textile-printing', key: 'nav.textile' },
  { to: '/promotional-products', key: 'nav.promo' },
  { to: '/contact', key: 'nav.contact' },
]

/** Company / info routes (footer). */
export const COMPANY_NAV: NavItem[] = [
  { to: '/about', key: 'nav.about' },
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/contact', key: 'nav.contact' },
]
