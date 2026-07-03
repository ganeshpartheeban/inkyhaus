import { Link } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'
import { Section } from './ui'

export function NotFound() {
  const { t, locale } = useI18n()
  const en = locale === 'en'
  return (
    <Section className="!py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{en ? 'Page not found' : 'Seite nicht gefunden'}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          {en
            ? 'The page you’re looking for doesn’t exist or has moved. Try one of these:'
            : 'Die gesuchte Seite existiert nicht oder wurde verschoben. Versuchen Sie eine dieser Optionen:'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-lg flashy-gradient px-6 py-3 font-medium text-white transition hover:opacity-90">
            {t('nav.home')}
          </Link>
          <Link to="/textile-printing" className="rounded-lg border border-line bg-surface px-6 py-3 font-medium transition-colors hover:border-ink">
            {t('nav.textile')}
          </Link>
          <Link to="/promotional-products" className="rounded-lg border border-line bg-surface px-6 py-3 font-medium transition-colors hover:border-ink">
            {t('nav.promo')}
          </Link>
          <Link to="/contact" className="rounded-lg border border-line bg-surface px-6 py-3 font-medium transition-colors hover:border-ink">
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </Section>
  )
}
