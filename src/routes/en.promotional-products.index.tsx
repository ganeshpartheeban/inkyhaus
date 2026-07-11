import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { HUBS } from '../lib/catalog'
import { HubPage } from '../components/HubPage'

export const Route = createFileRoute('/en/promotional-products/')({
  head: () =>
    pageHead({
      title: 'Promotional Products & Corporate Gifts · Inkyhaus Berlin',
      description: HUBS['promotional-products'].intro.en,
      path: '/en/promotional-products',
      locale: 'en',
    }),
  component: () => <HubPage hub="promotional-products" />,
})
