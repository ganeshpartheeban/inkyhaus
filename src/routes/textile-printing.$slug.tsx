import { createFileRoute, notFound } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { getProduct } from '../lib/catalog'
import { ProductDetail } from '../components/ProductDetail'

export const Route = createFileRoute('/textile-printing/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug)
    if (!product || product.hub !== 'textile-printing') throw notFound()
    return { product }
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product
    if (!p) return {}
    return pageHead({
      title: `${p.title.de} in Berlin · Inkyhaus`,
      description: p.description.de,
      path: `/textile-printing/${p.slug}`,
      locale: DEFAULT_LOCALE,
      ogImage: `/og/${p.slug}.jpg`,
      ogImageAlt: p.title.de,
    })
  },
  component: ProductPage,
})

function ProductPage() {
  const { product } = Route.useLoaderData()
  return <ProductDetail product={product} />
}
