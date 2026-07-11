import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Imprint } from './imprint'

export const Route = createFileRoute('/en/imprint')({
  head: () =>
    pageHead({
      title: 'Imprint · Inkyhaus',
      description: 'Legal notice of Inkyhaus.',
      path: '/en/imprint',
      locale: 'en',
      noindex: true,
    }),
  component: Imprint,
})
