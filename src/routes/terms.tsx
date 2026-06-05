import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/terms')({
  head: () =>
    pageHead({
      title: 'AGB · Inkyhaus',
      description: 'Allgemeine Geschäftsbedingungen von Inkyhaus.',
      path: '/terms',
      locale: DEFAULT_LOCALE,
      noindex: true,
    }),
  component: () => <LegalPage titleKeyDe="AGB" titleEn="Terms" />,
})
