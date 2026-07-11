import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { HUBS } from '../lib/catalog'
import { HubPage } from '../components/HubPage'

export const Route = createFileRoute('/en/textile-printing/')({
  head: () =>
    pageHead({
      title: 'Textile Printing & Custom Apparel · Inkyhaus Berlin',
      description: HUBS['textile-printing'].intro.en,
      path: '/en/textile-printing',
      locale: 'en',
    }),
  component: () => <HubPage hub="textile-printing" />,
})
