import { lazy, Suspense } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { I18nProvider } from '../lib/i18n'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BottomTabBar } from '../components/BottomTabBar'
import { TawkChat } from '../components/TawkChat'
import { JsonLd } from '../components/JsonLd'
import { buildOrganizationLD, buildPersonLD, buildServiceLD } from '../lib/seo'
import { withBase } from '../lib/asset'

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
      { name: 'theme-color', content: '#16161d' },
      { title: 'Inkyhaus · Textildruck & individuelle Bekleidung in Berlin' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: withBase('/favicon.svg'), type: 'image/svg+xml' },
      { rel: 'icon', href: withBase('/favicon.ico'), sizes: 'any' },
      { rel: 'apple-touch-icon', href: withBase('/apple-touch-icon.png') },
      { rel: 'manifest', href: withBase('/manifest.json') },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
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

  return (
    <I18nProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Zum Inhalt springen
      </a>
      <Header />
      {/* 220ms cross-fade on route change; padding-bottom clears the mobile tab bar */}
      <main id="main" key={pathname} className="page-transition pb-24 lg:pb-0">
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
      <JsonLd data={[buildOrganizationLD(), buildPersonLD(), buildServiceLD()]} />
    </I18nProvider>
  )
}
