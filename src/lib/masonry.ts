// Responsive masonry helpers. Uses matchMedia (not resize listeners) for column
// counts, per the performance non-negotiables (Build Brief §06).
import { useEffect, useState } from 'react'

type Breakpoint = { query: string; columns: number }

// Mobile-first: default 1 column, widen at breakpoints.
const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  { query: '(min-width: 1024px)', columns: 3 },
  { query: '(min-width: 640px)', columns: 2 },
]

export function useColumnCount(breakpoints: Breakpoint[] = DEFAULT_BREAKPOINTS, fallback = 1): number {
  const [columns, setColumns] = useState(fallback)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const lists = breakpoints.map((b) => ({ ...b, mql: window.matchMedia(b.query) }))

    const compute = () => {
      const match = lists.find((l) => l.mql.matches)
      setColumns(match ? match.columns : fallback)
    }

    compute()
    lists.forEach((l) => l.mql.addEventListener('change', compute))
    return () => lists.forEach((l) => l.mql.removeEventListener('change', compute))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return columns
}

/** Distribute items round-robin into N balanced columns, preserving order per column. */
export function distribute<T>(items: T[], columns: number): T[][] {
  const cols: T[][] = Array.from({ length: Math.max(1, columns) }, () => [])
  items.forEach((item, i) => {
    cols[i % cols.length].push(item)
  })
  return cols
}
