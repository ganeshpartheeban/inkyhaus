// Shared legal page shell. ⚠️ Content is PLACEHOLDER — German law requires a
// complete Impressum (§5 TMG) and Datenschutzerklärung (GDPR). Supply real text.
import { useI18n } from '../lib/i18n'
import { Breadcrumbs, Section } from './ui'

export function LegalPage({ titleKeyDe, titleEn, children }: { titleKeyDe: string; titleEn: string; children?: React.ReactNode }) {
  const { t, locale } = useI18n()
  const title = locale === 'en' ? titleEn : titleKeyDe
  return (
    <>
      <Breadcrumbs items={[{ name: t('nav.home'), to: '/' }, { name: title }]} />
      <Section className="!pt-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          <div className="mt-6 space-y-4 text-muted">
            {children ?? (
              <p className="rounded-xl border border-dashed border-accent/50 bg-accent-soft/40 p-4 text-sm text-ink-soft">
                ⚠️ {locale === 'en' ? 'Placeholder — legal content to be supplied before launch.' : 'Platzhalter — rechtlicher Inhalt vor dem Launch einzufügen.'}
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
