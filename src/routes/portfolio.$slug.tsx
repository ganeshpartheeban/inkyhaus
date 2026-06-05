import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getProject } from '../lib/portfolio'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { pageHead, buildBreadcrumbLD, buildImageGalleryLD } from '../lib/seo'
import { Breadcrumbs, Section } from '../components/ui'
import { Cover } from '../components/Cover'
import { JsonLd } from '../components/JsonLd'

export const Route = createFileRoute('/portfolio/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return { project }
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project
    if (!p) return {}
    return pageHead({
      title: `${p.title.de} · Referenz · Inkyhaus`,
      description: p.intro.de,
      path: `/portfolio/${p.slug}`,
      locale: DEFAULT_LOCALE,
      ogImage: `/og/${p.slug}.jpg`,
      ogImageAlt: p.title.de,
    })
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const { project: p } = Route.useLoaderData()
  const { t, locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbLD([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: p.title.en, path: `/portfolio/${p.slug}` },
          ]),
          buildImageGalleryLD([{ url: `/og/${p.slug}.jpg`, caption: p.title.en, location: p.location }]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: t('nav.home'), to: '/' },
          { name: t('nav.portfolio'), to: '/portfolio' },
          { name: p.title[l] },
        ]}
      />
      <Section className="!pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{p.kind[l]}</p>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{p.title[l]}</h1>
        <p className="mt-3 text-sm text-muted">
          {p.location} · {p.date}
        </p>
        <Cover src={p.cover} accent={p.accent} alt={p.title[l]} priority sizes="100vw" className="mt-8 aspect-[16/9] w-full rounded-[var(--radius-card)]" />
        <div className="mt-8 max-w-prose space-y-4 text-lg text-ink-soft">
          <p className="font-medium text-ink">{p.intro[l]}</p>
          {p.body.map((para, i) => (
            <p key={i}>{para[l]}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            hash="booking-enquiry"
            className="rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.985] motion-reduce:transition-none hover:bg-accent-strong"
          >
            {t('cta.enquire')}
          </Link>
          <Link to="/portfolio" className="rounded-full border border-line px-6 py-3 font-medium hover:border-ink">
            {t('cta.viewAll')}
          </Link>
        </div>
      </Section>
    </>
  )
}
