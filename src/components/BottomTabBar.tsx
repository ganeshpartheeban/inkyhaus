// Fixed-bottom 4-tab nav (mobile only). Hides on scroll-down, shows on scroll-up.
// Safe-area padding for notched devices. Replaces the hamburger menu (§07).
import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Home, Shirt, Gift, MessageSquareText } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { TAB_NAV } from '../lib/nav'

// Positional — must align with TAB_NAV order (Home, Textile, Promo, Contact).
const ICONS = [Home, Shirt, Gift, MessageSquareText]

export function BottomTabBar() {
  const { t } = useI18n()
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const goingDown = y > lastY.current
        // ignore tiny jitters; always show near the top
        if (Math.abs(y - lastY.current) > 6) setHidden(goingDown && y > 80)
        lastY.current = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md pb-safe transition-transform duration-300 motion-reduce:transition-none ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
      aria-label={t('a11y.menu')}
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${TAB_NAV.length}, minmax(0, 1fr))` }}>
        {TAB_NAV.map((item, i) => {
          const Icon = ICONS[i]
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted transition-transform active:scale-[0.96] motion-reduce:transition-none [&.active]:text-accent"
                activeOptions={{ exact: item.to === '/' }}
              >
                <Icon size={20} strokeWidth={1.75} aria-hidden />
                <span>{t(item.key)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
