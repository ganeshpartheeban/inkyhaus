// Presentational helpers for the legal pages (Impressum / Datenschutz / AGB).
// Content lives in the route files; these just style it consistently inside the
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

/** Highlighted [placeholder] the operator must replace with real data. */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="rounded bg-accent-soft/70 px-1 font-medium text-ink-soft">[{children}]</span>
}

/** Prominent "this is a template, get it reviewed" callout shown at the top. */
export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-accent/60 bg-accent-soft/40 p-4 text-sm text-ink-soft">
      ⚠️ {children}
    </div>
  )
}

export function Updated({ children }: { children: ReactNode }) {
  return <p className="mt-10 text-xs text-ink-soft">{children}</p>
}
