import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { LegalPage } from '../components/LegalPage'

export const Route = createFileRoute('/imprint')({
  head: () =>
    pageHead({
      title: 'Impressum · Inkyhaus',
      description: 'Impressum von Inkyhaus.',
      path: '/imprint',
      locale: DEFAULT_LOCALE,
      noindex: true,
    }),
  component: () => <LegalPage titleKeyDe="Impressum" titleEn="Imprint" />,
})
