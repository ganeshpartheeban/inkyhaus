// Renders a real cover image when `src` is provided, else the branded
// generative art. If the image fails to load, it falls back to the art too —
// so a missing file never shows as a broken image.
import { useState } from 'react'
import { PlaceholderArt } from './PlaceholderArt'

type Props = {
  src?: string
  accent: number
  alt?: string
  label?: string
  className?: string
  sizes?: string
  /** hero/above-the-fold image → eager + high priority for LCP. */
  priority?: boolean
}

export function Cover({ src, accent, alt = '', label, className = '', sizes, priority }: Props) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <PlaceholderArt accent={accent} label={label} className={className} />
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'auto' : 'async'}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
