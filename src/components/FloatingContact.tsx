// Floating WhatsApp button — source-aware: prefilled message includes the current
// route context. Sits above the bottom tab bar (§07).
import { MessageCircle } from 'lucide-react'
import { useRouterState } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'
import { whatsappLink } from '../lib/site-config'

const ROUTE_CONTEXT: Record<string, { de: string; en: string }> = {
  '/': { de: 'der Startseite', en: 'the homepage' },
  '/business': { de: 'Firmenlösungen', en: 'business solutions' },
  '/workwear': { de: 'Arbeitskleidung', en: 'workwear' },
  '/t-shirts': { de: 'T-Shirt-Druck', en: 'T-shirt printing' },
  '/hoodies': { de: 'Hoodie-Druck', en: 'hoodie printing' },
  '/sportswear': { de: 'Teamwear', en: 'teamwear' },
  '/accessories': { de: 'Accessoires', en: 'accessories' },
  '/print-techniques': { de: 'Drucktechniken', en: 'print techniques' },
  '/express': { de: 'Express-Druck', en: 'express printing' },
  '/portfolio': { de: 'Ihren Referenzen', en: 'your portfolio' },
  '/leistungen': { de: 'Ihren Leistungen', en: 'your services' },
  '/lasergravur': { de: 'Lasergravur', en: 'laser engraving' },
  '/3d-druck': { de: '3D-Druck', en: '3D printing' },
  '/werbetechnik': { de: 'Werbetechnik', en: 'signage / large format' },
  '/aufkleber': { de: 'Aufklebern & Vinyl', en: 'stickers & vinyl' },
  '/geschenke': { de: 'personalisierten Geschenken', en: 'personalized gifts' },
  '/trikot-restauration': { de: 'Trikot-Restauration', en: 'jersey restoration' },
  '/pokale-medaillen': { de: 'Pokalen & Medaillen', en: 'trophies & medals' },
  '/werbeartikel': { de: 'Werbeartikeln', en: 'promotional items' },
}

export function FloatingContact() {
  const { locale } = useI18n()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const ctx = ROUTE_CONTEXT[pathname]
  const topic = ctx ? ctx[locale === 'en' ? 'en' : 'de'] : locale === 'en' ? 'your services' : 'Ihren Leistungen'
  const message =
    locale === 'en'
      ? `Hi Inkyhaus, I'm interested in ${topic} and would like a quote.`
      : `Hallo Inkyhaus, ich interessiere mich für ${topic} und hätte gern ein Angebot.`

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/15 transition-transform active:scale-95 hover:scale-105 motion-reduce:transition-none bottom-[calc(env(safe-area-inset-bottom)+5rem)] lg:bottom-6"
    >
      <MessageCircle size={26} strokeWidth={2} aria-hidden />
    </a>
  )
}
