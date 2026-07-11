import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { About } from './about'

export const Route = createFileRoute('/en/about')({
  head: () =>
    pageHead({
      title: 'About Inkyhaus · Print Studio in Berlin Friedrichshain',
      description:
        'The all-in-one personalization & print studio in Berlin: textile printing, laser engraving, sublimation, stickers and 3D printing — premium quality with personal support.',
      path: '/en/about',
      locale: 'en',
    }),
  component: About,
})
