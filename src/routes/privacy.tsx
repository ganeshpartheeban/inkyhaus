import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/privacy')({
  head: () =>
    pageHead({
      title: 'Datenschutz · Inkyhaus',
      description: 'Datenschutzerklärung von Inkyhaus.',
      path: '/privacy',
      locale: DEFAULT_LOCALE,
      noindex: true,
    }),
  component: () => <LegalPage titleKeyDe="Datenschutz" titleEn="Privacy" />,
})
