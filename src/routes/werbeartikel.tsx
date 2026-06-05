import { createFileRoute } from '@tanstack/react-router'
import { getCategory } from '../lib/products'
import { CategoryPage } from '../components/CategoryPage'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'

const cat = getCategory('werbeartikel')!

export const Route = createFileRoute('/werbeartikel')({
  head: () =>
    pageHead({
      title: 'Werbeartikel & Branding bedrucken Berlin · Inkyhaus',
      description: cat.intro.de,
      path: cat.path,
      locale: DEFAULT_LOCALE,
      ogImage: `/og/${cat.slug}.jpg`,
      ogImageAlt: cat.title.de,
    }),
  component: () => <CategoryPage category={cat} variant="specialty" />,
})
