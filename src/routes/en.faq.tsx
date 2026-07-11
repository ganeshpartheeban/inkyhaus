import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Faq } from './faq'

export const Route = createFileRoute('/en/faq')({
  head: () =>
    pageHead({
      title: 'FAQ · Frequently Asked Questions · Inkyhaus Berlin',
      description:
        'Answers to common questions: minimum order, production speed, print techniques, artwork formats, delivery in Berlin and print durability.',
      path: '/en/faq',
      locale: 'en',
    }),
  component: Faq,
})
