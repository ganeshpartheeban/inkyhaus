// Product/category card. Uses real cover when present, otherwise branded
// placeholder art. Tap feedback + content-visibility for off-screen cards (§06/§07).
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import type { ProductCategory } from '../lib/products'
import { Cover } from './Cover'

export function ProductCard({ category, drift = false }: { category: ProductCategory; drift?: boolean }) {
  const { locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'

  return (
    <Link
      to={category.path}
      className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-transform active:scale-[0.985] motion-reduce:transition-none hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Cover
          src={category.cover}
          accent={category.accent}
          alt={category.title[l]}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none ${drift && !category.cover ? 'animate-drift' : ''}`}
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="font-serif text-lg">{category.title[l]}</h3>
          <p className="mt-1 text-sm text-muted">{category.tagline[l]}</p>
        </div>
        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
          aria-hidden
        />
      </div>
    </Link>
  )
}
