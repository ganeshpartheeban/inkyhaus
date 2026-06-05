import { createFileRoute } from '@tanstack/react-router'
import { getCategory } from '../lib/products'
import { CategoryPage } from '../components/CategoryPage'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'

const cat = getCategory('pokale-medaillen')!

export const Route = createFileRoute('/pokale-medaillen')({
  head: () =>
    pageHead({
      title: 'Pokale & Medaillen Gravur Berlin · Inkyhaus',
      description: cat.intro.de,
      path: cat.path,
      locale: DEFAULT_LOCALE,
      ogImage: `/og/${cat.slug}.jpg`,
      ogImageAlt: cat.title.de,
    }),
  component: () => <CategoryPage category={cat} variant="specialty" />,
})
