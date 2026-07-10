// Pointer-tracking 3D tilt (perspective + rotateX/Y). Mouse-only — touch and
// reduced-motion users get a static card. rAF-throttled; transform is set
// imperatively so moves never re-render React. Children with `.tilt-pop`
// float above the surface (translateZ) while tilted.
import { useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** max tilt in degrees */
  max?: number
}

export function TiltCard({ children, className = '', max = 7 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const raf = useRef(0)

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale3d(1.012,1.012,1)`
    })
  }

  const reset = () => {
    cancelAnimationFrame(raf.current)
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset} className={`tilt-3d ${className}`}>
      {children}
    </div>
  )
}
