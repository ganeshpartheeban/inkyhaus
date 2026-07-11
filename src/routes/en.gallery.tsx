import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Gallery } from './gallery'

export const Route = createFileRoute('/en/gallery')({
  head: () =>
    pageHead({
      title: 'Gallery · Inkyhaus Berlin',
      description:
        'Selected work across textile printing, corporate gifts, promotional products, workwear, events and weddings.',
      path: '/en/gallery',
      locale: 'en',
    }),
  component: Gallery,
})
