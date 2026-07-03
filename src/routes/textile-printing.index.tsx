import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { HUBS } from '../lib/catalog'
import { HubPage } from '../components/HubPage'

export const Route = createFileRoute('/textile-printing/')({
  head: () =>
    pageHead({
      title: 'Textildruck & Bekleidung · Inkyhaus Berlin',
      description: HUBS['textile-printing'].intro.de,
      path: '/textile-printing',
      locale: DEFAULT_LOCALE,
      ogImage: '/og/textile-printing.jpg',
      ogImageAlt: HUBS['textile-printing'].title.de,
    }),
  component: () => <HubPage hub="textile-printing" />,
})
