import { lazy, Suspense } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  redirect,
  useRouterState,
} from '@tanstack/react-router'
import { STORAGE_KEY, enCounterpart, isEnPath } from '../lib/i18n'

import appCss from '../styles.css?url'
import { I18nProvider } from '../lib/i18n'
import { Header } from '../components/Header'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { Footer } from '../components/Footer'
import { BottomTabBar } from '../components/BottomTabBar'
import { TawkChat } from '../components/TawkChat'
import { IntroLoader } from '../components/IntroLoader'
import { JsonLd } from '../components/JsonLd'
import { buildLocalBusinessLD } from '../lib/seo'
import { withBase } from '../lib/asset'
// Hashed font URLs for preloading — same modules the CSS @imports reference,
// so Vite emits identical asset URLs and the preload matches the CSS request.
import antonWoff2 from '@fontsource/anton/files/anton-latin-400-normal.woff2?url'
import interTightWoff2 from '@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2?url'

// Code-split overlays (Build Brief §06): floating contact, cookie notice, modal.
const FloatingContact = lazy(() =>
  import('../components/FloatingContact').then((m) => ({ default: m.FloatingContact })),
)
const CookieNotice = lazy(() =>
  import('../components/CookieNotice').then((m) => ({ default: m.CookieNotice })),
)
const EngagementModal = lazy(() =>
  import('../components/EngagementModal').then((m) => ({ default: m.EngagementModal })),
)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#ede7db' },
      { title: 'Inkyhaus · Textildruck & individuelle Bekleidung in Berlin' },
    ],
    links: [
      // Fonts first: they gate every heading (Anton) and all body text (Inter
      // Tight); preloading skips the CSS→font two-hop discovery chain.
      { rel: 'preload', href: antonWoff2, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: interTightWoff2, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: withBase('/favicon.svg'), type: 'image/svg+xml' },
      { rel: 'icon', href: withBase('/favicon.ico'), sizes: 'any' },
      { rel: 'apple-touch-icon', href: withBase('/apple-touch-icon.png') },
      { rel: 'manifest', href: withBase('/manifest.json') },
    ],
  }),
  // Client-only preference redirect: users who chose English (or arrived via an
  // /en URL) get legacy German-path navigations rerouted to the /en counterpart.
  // Never runs during SSR, so crawlers always receive the URL they asked for.
  beforeLoad: ({ location }) => {
    if (typeof window === 'undefined') return
    let pref: string | null = null
    try {
      pref = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      /* storage unavailable */
    }
    if (pref !== 'en' || isEnPath(location.pathname)) return
    const target = enCounterpart(location.pathname)
    // Carry search + hash across so deep links (#booking-enquiry, ?utm_…) survive.
    if (target) throw redirect({ to: target, search: location.search, ...(location.hash ? { hash: location.hash } : {}) })
  },
  shellComponent: RootDocument,
  component: RootLayout,
})

// Runs before first paint: skip the intro veil on repeat loads in the same tab
// session, and hide the announcement bar if it was dismissed this session.
const INTRO_ONCE_SCRIPT =
  "try{if(sessionStorage.getItem('ih-intro'))document.documentElement.setAttribute('data-skip-intro','');else sessionStorage.setItem('ih-intro','1');if(sessionStorage.getItem('ih-announce-closed'))document.documentElement.setAttribute('data-announce-closed','')}catch(e){}"

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return (
    <html lang={isEnPath(pathname) ? 'en' : 'de'}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_ONCE_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  // Key <main> by the locale-independent path: real navigations remount (and
  // play the page transition), but switching DE ↔ EN on the same page keeps the
  // key stable — the content just re-renders in the other language, in place.
  const baseKey = pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname

  return (
    <I18nProvider>
      <IntroLoader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {isEnPath(pathname) ? 'Skip to content' : 'Zum Inhalt springen'}
      </a>
      <AnnouncementBar />
      <Header />
      {/* 220ms cross-fade on route change; padding-bottom clears the mobile tab bar */}
      <main id="main" key={baseKey} className="page-transition pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomTabBar />
      <Suspense fallback={null}>
        <FloatingContact />
      </Suspense>
      <Suspense fallback={null}>
        <CookieNotice />
      </Suspense>
      <Suspense fallback={null}>
        <EngagementModal />
      </Suspense>
      <TawkChat />
      <JsonLd data={buildLocalBusinessLD(isEnPath(pathname) ? 'en' : 'de')} />
    </I18nProvider>
  )
}
