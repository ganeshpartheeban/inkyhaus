import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { Contact } from './contact'

export const Route = createFileRoute('/en/contact')({
  head: () =>
    pageHead({
      title: 'Contact & Request a Quote · Inkyhaus Berlin',
      description:
        'Contact Inkyhaus in Berlin-Friedrichshain: request a quote via form, WhatsApp or email — we usually reply the same day. Pickup & delivery available.',
      path: '/en/contact',
      locale: 'en',
    }),
  component: Contact,
})
