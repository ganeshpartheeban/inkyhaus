import { createFileRoute, notFound } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { DEFAULT_LOCALE } from '../lib/i18n'
import { getMethod } from '../lib/catalog'
import { MethodDetail } from '../components/MethodDetail'

export const Route = createFileRoute('/printing-methods/$slug')({
  loader: ({ params }) => {
    const method = getMethod(params.slug)
    if (!method) throw notFound()
    return { method }
  },
  head: ({ loaderData }) => {
    const m = loaderData?.method
    if (!m) return {}
    return pageHead({
      title: `${m.name.de} · Druckverfahren · Inkyhaus`,
      description: m.description.de,
      path: `/printing-methods/${m.slug}`,
      locale: DEFAULT_LOCALE,
    })
  },
  component: MethodPage,
})

function MethodPage() {
  const { method } = Route.useLoaderData()
  return <MethodDetail method={method} />
}
