import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Terms } from './terms'

export const Route = createFileRoute('/en/terms')({
  head: () =>
    pageHead({
      title: 'Terms & Conditions · Inkyhaus',
      description: 'Terms and conditions of Inkyhaus.',
      path: '/en/terms',
      locale: 'en',
      noindex: true,
    }),
  component: Terms,
})
