import { createFileRoute, notFound } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { getProduct } from '../lib/catalog'
import { ProductDetail } from '../components/ProductDetail'

export const Route = createFileRoute('/en/textile-printing/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug)
    if (!product || product.hub !== 'textile-printing') throw notFound()
    return { product }
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product
    if (!p) return {}
    return pageHead({
      title: `${p.title.en} in Berlin · Inkyhaus`,
      description: p.description.en,
      path: `/en/textile-printing/${p.slug}`,
      locale: 'en',
      ogImage: `/og/${p.slug}.jpg`,
      ogImageAlt: p.title.en,
    })
  },
  component: ProductPage,
})

function ProductPage() {
  const { product } = Route.useLoaderData()
  return <ProductDetail product={product} />
}
