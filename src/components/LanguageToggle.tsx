import { ACTIVE_LOCALES, LOCALE_LABELS, useI18n } from '../lib/i18n'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  if (ACTIVE_LOCALES.length < 2) return null

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/70 p-0.5 text-xs ${className}`}
      role="group"
      aria-label={t('a11y.langToggle')}
    >
      {ACTIVE_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 font-medium uppercase tracking-wide transition-colors ${
            locale === l ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
          }`}
          title={LOCALE_LABELS[l]}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
