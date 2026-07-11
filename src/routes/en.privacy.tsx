import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Privacy } from './privacy'

export const Route = createFileRoute('/en/privacy')({
  head: () =>
    pageHead({
      title: 'Privacy Policy · Inkyhaus',
      description: 'Privacy policy of Inkyhaus.',
      path: '/en/privacy',
      locale: 'en',
      noindex: true,
    }),
  component: Privacy,
})
