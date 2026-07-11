// English home — same component as `/`, English head. The URL drives the locale.
import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Home } from './index'

export const Route = createFileRoute('/en/')({
  head: () =>
    pageHead({
      title: 'Inkyhaus · Textile Printing & Promotional Products in Berlin',
      description:
        'Premium textile printing & promotional products in Berlin: t-shirts, hoodies, workwear, mugs, engraving & more. No minimum order, 24–72h, express available.',
      path: '/en',
      locale: 'en',
      ogImageAlt: 'Inkyhaus — textile printing & promotional products Berlin',
    }),
  component: Home,
})
