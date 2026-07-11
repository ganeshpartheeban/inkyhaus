import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Methods } from './printing-methods.index'

export const Route = createFileRoute('/en/printing-methods/')({
  head: () =>
    pageHead({
      title: 'Printing Methods in Berlin: DTF, HTV, Embroidery & more · Inkyhaus',
      description:
        'DTF, HTV/flex, embroidery, sublimation, laser engraving, stickers & vinyl and 3D printing — we pick the right technique for your product.',
      path: '/en/printing-methods',
      locale: 'en',
    }),
  component: Methods,
})
