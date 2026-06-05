// Full-screen image lightbox: keyboard + swipe nav, LQIP blur placeholder,
// position indicator, safe-area padding (§07). Lazy-loaded by consumers.
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type LightboxImage = { src: string; alt: string }

type Props = {
  images: LightboxImage[]
  /** Index within `images` to open at. */
  index: number
  onClose: () => void
  onIndexChange: (i: number) => void
}

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const [loaded, setLoaded] = useState(false)
  const touchX = useRef<number | null>(null)
  const total = images.length

  const go = useCallback(
    (delta: number) => {
      setLoaded(false)
      onIndexChange((index + delta + total) % total)
    },
    [index, total, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [go, onClose])

  const img = images[index]
  if (!img) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 pt-safe pb-safe motion-safe:animate-[page-fade_180ms_ease]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={22} />
      </button>

      {total > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <figure className="max-h-full max-w-5xl">
        <img
          src={img.src}
          alt={img.alt}
          onLoad={() => setLoaded(true)}
          className="max-h-[80vh] w-auto rounded-lg object-contain transition-[filter] duration-300"
          style={{ filter: loaded ? 'blur(0)' : 'blur(14px)' }}
        />
        <figcaption className="mt-3 flex items-center justify-between text-sm text-white/80">
          <span>{img.alt}</span>
          <span className="tabular-nums">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

export default Lightbox
