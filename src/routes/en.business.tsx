import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Business } from './business'

export const Route = createFileRoute('/en/business')({
  head: () =>
    pageHead({
      title: 'Corporate Workwear & Company Apparel Berlin · Inkyhaus',
      description:
        'Branded workwear, team apparel and corporate gifts for Berlin businesses — no minimum order, fast local production, express available.',
      path: '/en/business',
      locale: 'en',
    }),
  component: Business,
})
