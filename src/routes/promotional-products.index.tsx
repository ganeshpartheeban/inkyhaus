import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { HUBS } from '../lib/catalog'
import { HubPage } from '../components/HubPage'

export const Route = createFileRoute('/promotional-products/')({
  head: () =>
    pageHead({
      title: 'Werbeartikel & Firmengeschenke · Inkyhaus Berlin',
      description: HUBS['promotional-products'].intro.de,
      path: '/promotional-products',
      locale: DEFAULT_LOCALE,
      ogImage: '/og/promotional-products.jpg',
      ogImageAlt: HUBS['promotional-products'].title.de,
    }),
  component: () => <HubPage hub="promotional-products" />,
})
