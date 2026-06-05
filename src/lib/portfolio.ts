// Portfolio / case-study content (repurposed from the brief's case-studies.ts).
// Drives the dynamic /portfolio/$slug route and the Home portfolio grid.
//
// ⚠️ PLACEHOLDER PROJECTS — replace with real client work, outcomes and imagery.
import type { Localized } from './products'
import { withBase } from './asset'

export type Project = {
  slug: string
  title: Localized
  /** Industry / use-case grouping. */
  kind: Localized
  location: string
  /** Display date (e.g. "2025"). */
  date: string
  intro: Localized
  /** Body paragraphs telling the production story. */
  body: Localized[]
  /** Techniques/products used (free tags). */
  tags: string[]
  accent: number
  /** TODO: cover + sequence image paths (gallery-thumbs / gallery-full). */
  cover?: string
  sequence?: string[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'cafe-friedrichshain-crew',
    title: { de: 'Crew-Shirts für ein Café in Friedrichshain', en: 'Crew shirts for a Friedrichshain café' },
    kind: { de: 'Gastronomie', en: 'Hospitality' },
    location: 'Berlin, Friedrichshain',
    date: '2025',
    intro: {
      de: 'Einheitliche, langlebige Shirts für das Service-Team — markenkonform und in zwei Tagen geliefert.',
      en: 'Consistent, durable shirts for the service team — on-brand and delivered in two days.',
    },
    body: [
      {
        de: 'Das Café wollte einen einheitlichen Auftritt ohne hohe Mindestmengen. Wir haben das Logo für den Vollfarbdruck optimiert und auf strapazierfähigen Bio-Baumwoll-Shirts produziert.',
        en: 'The café wanted a consistent look without high minimums. We optimized the logo for full-color print and produced on durable organic-cotton shirts.',
      },
    ],
    tags: ['Vollfarbdruck', 'Workwear', 'Express'],
    accent: 35,
  },
  {
    slug: 'startup-onboarding-kit',
    title: { de: 'Onboarding-Kit für ein Startup', en: 'Onboarding kit for a startup' },
    kind: { de: 'Startups & Tech', en: 'Startups & Tech' },
    location: 'Berlin, Mitte',
    date: '2025',
    intro: {
      de: 'Hoodies, Caps und Stoffbeutel als Willkommenspaket für neue Mitarbeitende.',
      en: 'Hoodies, caps and tote bags as a welcome pack for new hires.',
    },
    body: [
      {
        de: 'Für das wachsende Team haben wir ein wiederbestellbares Merch-Set entwickelt: Premium-Hoodies mit dezentem Stick-Look-Druck, dazu passende Accessoires.',
        en: 'For the growing team we built a repeat-orderable merch set: premium hoodies with a subtle embroidery-look print plus matching accessories.',
      },
    ],
    tags: ['Hoodies', 'Accessoires', 'Merchandise'],
    accent: 280,
  },
  {
    slug: 'fussballverein-trikotsatz',
    title: { de: 'Trikotsatz für einen Fußballverein', en: 'Jersey set for a football club' },
    kind: { de: 'Sport & Vereine', en: 'Sport & Clubs' },
    location: 'Berlin',
    date: '2024',
    intro: {
      de: 'Kompletter Trikotsatz mit Spielernamen, Nummern und Sponsorenlogos.',
      en: 'Complete jersey set with player names, numbers and sponsor logos.',
    },
    body: [
      {
        de: 'Von der Sponsorenplatzierung bis zur Nummerierung haben wir den gesamten Satz produktionsfertig aufbereitet — pünktlich zum Saisonstart.',
        en: 'From sponsor placement to numbering, we prepared the entire set production-ready — in time for the season opener.',
      },
    ],
    tags: ['Teamwear', 'Sporttrikots', 'Vollfarbdruck'],
    accent: 150,
  },
]

// Relevant license-free photo per project at /img/<slug>.webp (replace to override).
for (const p of PROJECTS) {
  if (!p.cover) p.cover = withBase(`/img/${p.slug}.webp`)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
