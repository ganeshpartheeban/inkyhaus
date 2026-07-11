// Small shared layout primitives + breadcrumbs.
import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useLocaleTo } from '../lib/i18n'

export function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="container-edge">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
  /** Use `h1` when this is the page's main title (each page needs exactly one h1). */
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="mt-3 text-balance text-3xl sm:text-4xl">{title}</Tag>
      {subtitle && <p className="mt-3 text-pretty text-muted">{subtitle}</p>}
    </div>
  )
}

export function Breadcrumbs({ items }: { items: Array<{ name: string; to?: string }> }) {
  const lp = useLocaleTo()
  return (
    <nav aria-label="Breadcrumb" className="container-edge pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.to ? (
              <Link to={lp(it.to) as '/'} className="hover:text-ink">
                {it.name}
              </Link>
            ) : (
              <span className="text-ink">{it.name}</span>
            )}
            {i < items.length - 1 && <ChevronRight size={13} aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
