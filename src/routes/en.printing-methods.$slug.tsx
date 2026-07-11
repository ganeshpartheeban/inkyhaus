import { createFileRoute, notFound } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { getMethod } from '../lib/catalog'
import { MethodDetail } from '../components/MethodDetail'

export const Route = createFileRoute('/en/printing-methods/$slug')({
  loader: ({ params }) => {
    const method = getMethod(params.slug)
    if (!method) throw notFound()
    return { method }
  },
  head: ({ loaderData }) => {
    const m = loaderData?.method
    if (!m) return {}
    return pageHead({
      title: `${m.name.en} in Berlin · Printing Methods · Inkyhaus`,
      description: m.description.en,
      path: `/en/printing-methods/${m.slug}`,
      locale: 'en',
      ogImage: `/og/${m.slug}.jpg`,
      ogImageAlt: m.name.en,
    })
  },
  component: MethodPage,
})

function MethodPage() {
  const { method } = Route.useLoaderData()
  return <MethodDetail method={method} />
}
