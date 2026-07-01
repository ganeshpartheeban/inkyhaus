// Presentational helpers for the legal pages (Impressum / Datenschutz / AGB).
// Content lives in the route files; these style it consistently inside the
// LegalPage shell (which wraps children in a `text-muted space-y-4` container).
import type { ReactNode } from 'react'

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-8 text-lg font-medium text-ink">{children}</h2>
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-ink-soft">{children}</h3>
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed">{children}</p>
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">{children}</ul>
}

export function LI({ children }: { children: ReactNode }) {
  return <li>{children}</li>
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
      {children}
    </a>
  )
}
