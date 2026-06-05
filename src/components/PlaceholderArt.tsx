// Branded generative cover art used until real photography lands.
// Keyed by an OKLCH hue so each category/project gets a distinct, on-brand panel.
type Props = {
  accent: number
  label?: string
  className?: string
}

export function PlaceholderArt({ accent, label, className = '' }: Props) {
  const c1 = `oklch(0.7 0.16 ${accent})`
  const c2 = `oklch(0.45 0.17 ${accent})`
  const c3 = `oklch(0.92 0.05 ${accent})`
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${c2}, ${c1})` }}
      aria-hidden="true"
    >
      {/* halftone-ish dots, echoing screen-print texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: `radial-gradient(${c3} 1.5px, transparent 1.6px)`,
          backgroundSize: '14px 14px',
        }}
      />
      <div
        className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full blur-2xl opacity-40"
        style={{ background: c3 }}
      />
      {label ? (
        <span className="absolute left-4 top-4 font-serif text-sm tracking-wide text-white/90">{label}</span>
      ) : null}
    </div>
  )
}
