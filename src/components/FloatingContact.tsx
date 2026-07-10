// Floating WhatsApp button — source-aware: prefilled message includes the current
// route context, derived from the catalog. Sits above the bottom tab bar (§07).
import { useRouterState } from '@tanstack/react-router'
import { WhatsAppIcon } from './WhatsAppIcon'
import { useI18n } from '../lib/i18n'
import { whatsappLink } from '../lib/site-config'
import { HUBS, getProduct, getMethod } from '../lib/catalog'

export function FloatingContact() {
  const { locale } = useI18n()
  const l = locale === 'en' ? 'en' : 'de'
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const topic = deriveTopic(pathname, l)
  const message =
    l === 'en'
      ? `Hi Inkyhaus, I'm interested in ${topic} and would like a quote.`
      : `Hallo Inkyhaus, ich interessiere mich für ${topic} und hätte gern ein Angebot.`

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat auf WhatsApp starten"
      title="WhatsApp"
      className="fixed right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/15 transition-transform active:scale-95 hover:scale-105 motion-reduce:transition-none bottom-[calc(env(safe-area-inset-bottom)+5rem)] lg:bottom-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}

function deriveTopic(pathname: string, l: 'de' | 'en'): string {
  const seg = pathname.replace(/^\/(inkyhaus\/)?/, '').split('/').filter(Boolean)
  const fallback = l === 'en' ? 'your services' : 'Ihren Leistungen'
  if (seg.length === 0) return l === 'en' ? 'your custom products' : 'Ihren individuellen Produkten'

  if (seg.length >= 2 && (seg[0] === 'textile-printing' || seg[0] === 'promotional-products')) {
    return getProduct(seg[1])?.title[l] ?? fallback
  }
  if (seg[0] === 'printing-methods') {
    if (seg[1]) return getMethod(seg[1])?.name[l] ?? fallback
    return l === 'en' ? 'your printing method' : 'Ihrem Druckverfahren'
  }
  if (seg[0] === 'textile-printing') return HUBS['textile-printing'].title[l]
  if (seg[0] === 'promotional-products') return HUBS['promotional-products'].title[l]
  if (seg[0] === 'gallery') return l === 'en' ? 'your work' : 'Ihren Arbeiten'
  if (seg[0] === 'business') return l === 'en' ? 'business solutions' : 'Firmenlösungen'
  return fallback
}
