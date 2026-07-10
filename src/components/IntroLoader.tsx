// First-paint logo loader. Pure CSS (see styles.css `.intro-loader`): the veil
// fades itself out with `animation-fill-mode: forwards`, so it never traps
// content even with JS disabled, and reduced-motion hides it instantly. Because
// the root layout persists across client-side navigation, it only plays on full
// page loads — not on SPA route changes.
import { withBase } from '../lib/asset'

export function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-mark flex flex-col items-center gap-4">
        <img
          src={withBase('/logo-mark-dark.png')}
          alt=""
          width={72}
          height={72}
          className="h-16 w-16"
          fetchPriority="high"
          decoding="async"
        />
        <span className="flex flex-col items-center gap-1">
          <span className="font-serif text-2xl tracking-tight text-ink">Inkyhaus</span>
          <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-ink-soft">
            Custom Personalization
          </span>
        </span>
        <span className="intro-bar block h-[3px] w-24 rounded-full bg-accent-bright" />
      </div>
    </div>
  )
}
